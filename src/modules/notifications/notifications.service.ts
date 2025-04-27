import { Injectable } from '@nestjs/common';
import { NotificationRepository } from './repositories/notification.repository';
import {
  CreateNotificationDto,
  TestNotificationDto,
} from './dtos/create-notification.dto';
import { Notification } from './entities/notification.entity';
import { NotificationType } from './enums/notification-type.enum';
import { OnEvent } from '@nestjs/event-emitter';
import { UserService } from '../user/user.service';
import { FirebaseService } from 'src/google/firebase/firebase.service';
import { VehicleService } from '../vehicle/vehicle.service';
import { PaginationDto } from 'src/shared/dtos';
import { Vehicle } from '../vehicle/entities/vehicle.entity';

@Injectable()
export class NotificationsService {
  constructor(
    private readonly notificationRepository: NotificationRepository,
    private readonly vehicleService: VehicleService,
    private readonly firebaseService: FirebaseService,
    private readonly userService: UserService,
  ) {}

  async create(dto: CreateNotificationDto) {
    const { receiverId, type } = dto;

    if (!receiverId) return;

    const [notification, receivingUser] = await Promise.all([
      this.notificationRepository.save(dto),
      this.userService.find(null, { id: dto?.senderId }),
    ]);

    notification.sender = receivingUser;

    const [body, fcmTokens] = await Promise.all([
      this.getNotificationBody(notification),
      this.userService.getFcmTokens(receiverId),
    ]);

    const data = {
      receiverId: dto?.receiverId?.toString(),
      senderId: dto?.senderId?.toString(),
      type: dto?.type?.toString(),
      resourceId: dto?.resourceId?.toString(),
    };

    this.firebaseService.sendNotification({
      body,
      type,
      fcmTokens,
      data,
    });

    return notification;
  }

  async createTest(dto: TestNotificationDto) {
    const { title, body, fcm_token } = dto;

    return await this.firebaseService.sendTestNotification({
      body,
      title,
      fcm_token,
    });
  }

  @OnEvent('notification.create', { async: true })
  async handleCreateEvent(dto: CreateNotificationDto) {
    await this.create(dto);
  }

  async find(query: PaginationDto, userId: number) {
    const { limit, offset } = query;

    const response = await this.notificationRepository.findAndCount({
      where: { receiverId: userId },
      order: { createdAt: 'DESC' },
      relations: ['sender', 'receiver'],
      select: {
        id: true,
        type: true,
        resourceId: true,
        read: true,
        createdAt: true,
        sender: {
          id: true,
          name: true,
        },
        receiver: {
          id: true,
          name: true,
        },
      },
      take: limit,
      skip: offset,
    });

    let notifications = response[0];
    const total = response[1];

    notifications = await Promise.all(
      notifications?.map(async (notification) => {
        const message = await this.getNotificationBody(notification);
        const vehicle = await this.vehicleService.find(null, {
          id: notification.resourceId,
        });
        return {
          ...notification,
          name: message,
          status: vehicle.status,
          message,
        };
      }),
    );

    return { notifications, total };
  }

  async findContractor(query: PaginationDto, userId: number) {
    const { limit, offset } = query;

    const response = await this.notificationRepository.findAndCount({
      where: { receiverId: userId },
      order: { createdAt: 'DESC' },
      relations: ['sender', 'receiver'],
      select: {
        id: true,
        type: true,
        resourceId: true,
        read: true,
        createdAt: true,
        sender: {
          id: true,
          name: true,
        },
        receiver: {
          id: true,
          name: true,
        },
      },
      take: limit,
      skip: offset,
    });

    let notifications = response[0];
    const total = response[1];

    notifications = await Promise.all(
      notifications?.map(async (notification) => {
        const message = await this.getNotificationBody(notification);
        const vehicle = await this.vehicleService.find(null, {
          id: notification?.resourceId,
        });
        return {
          ...notification,
          name: message,
          status: vehicle?.status,
          message,
        };
      }),
    );

    return { notifications, total };
  }

  markAsRead(userId: number) {
    return this.notificationRepository.update(
      { receiverId: userId },
      { read: true },
    );
  }

  async hasUnread(userId: number) {
    const unreadCount = await this.notificationRepository.count({
      where: { receiverId: userId, read: false },
    });

    return !!unreadCount;
  }

  async getNotificationBody(notification: Notification) {
    const {
      type,
      sender: { name },
    } = notification;

    const vehicle = (await this.vehicleService.find(null, {
      id: notification.resourceId,
    })) as Vehicle;

    if (type === NotificationType.INVITATION_ACCEPTED_FROM_CONTRACTOR) {
      return `Your request is accepted by ${name} for ${vehicle.name}`;
    }

    if (type === NotificationType.INVITATION_REJECTED_FROM_CONTRACTOR) {
      return `Your request is rejected by ${name} for ${vehicle.name}`;
    }

    if (type === NotificationType.INVITATION_RECEIVED_FROM_COORDINATOR) {
      const vehicle = (await this.vehicleService.find(null, {
        id: notification.resourceId,
      })) as Vehicle;
      return `${name} invited you for '${vehicle.name}' vehicle`;
    }

    if (type === NotificationType.INVITATION_REJECTED_FROM_COORDINATOR) {
      const vehicle = (await this.vehicleService.find(null, {
        id: notification.resourceId,
      })) as Vehicle;
      return `${name} rejected for '${vehicle.name}' vehicle`;
    }

    if (type === NotificationType.CONTRACTOR_HIRED_BY_COORDINATOR) {
      const vehicle = (await this.vehicleService.find(null, {
        id: notification.resourceId,
      })) as Vehicle;
      return `${name} hired you for '${vehicle.name}' vehicle`;
    }

    if (type === NotificationType.HIRING_CANCELLED_BY_COORDINATOR) {
      const vehicle = (await this.vehicleService.find(null, {
        id: notification.resourceId,
      })) as Vehicle;
      return `${name} has cancelled your hiring for '${vehicle.name}' vehicle`;
    }

    if (type === NotificationType.INVITATION_CANCELLED_BY_COORDINATOR) {
      const vehicle = (await this.vehicleService.find(null, {
        id: notification.resourceId,
      })) as Vehicle;
      return `${name} has cancelled your invitation for '${vehicle.name}' vehicle`;
    }

    if (type === NotificationType.ONE_DAY_LEFT_FOR_JOB) {
      const vehicle = (await this.vehicleService.find(null, {
        id: notification.resourceId,
      })) as Vehicle;
      return `Your scheduled '${vehicle.name}' vehicle starts in 24 hours.`;
    }

    return 'You have a new notification';
  }
}

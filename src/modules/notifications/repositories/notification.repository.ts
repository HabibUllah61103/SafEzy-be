import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification } from '../entities/notification.entity';
import { PRIMARY_CONNECTION } from 'src/database';

export class NotificationRepository extends Repository<Notification> {
  constructor(
    @InjectRepository(Notification, PRIMARY_CONNECTION)
    notification: Repository<Notification>,
  ) {
    super(notification.target, notification.manager, notification.queryRunner);
  }
}

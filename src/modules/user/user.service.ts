import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  OnModuleInit,
} from '@nestjs/common';
import { UserRepository } from './repositories/user.respository';
import { FindOptionsSelect, FindOptionsWhere } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { HashingService } from 'src/shared/services/hashing.service';
import { FcmTokenRepository } from './repositories/fcm-token.repository';
import { LoggerService } from '../logger/logger.service';
import { getSafeUser } from 'src/utils/getSafeUser';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UserProfileRepository } from './repositories/user-profile.repository';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { CreateUserGoogleDto } from '../iam/auth/dtos/create-user-google.dto';
import formatCoordinatesIntoPoint from 'src/utils/formatCoordinatesIntoPoint';
import { Point } from 'geojson';
import { UserRole } from './enum/user-role.enum';
import { ConfigService } from '@nestjs/config';
import { SuccessMessageResponse } from 'src/shared/types/response.types';
import { handleServiceError } from 'src/utils/error-handler.util';

@Injectable()
export class UserService implements OnModuleInit {
  constructor(
    private readonly userProfileRepository: UserProfileRepository,
    private readonly fcmTokenRepository: FcmTokenRepository,
    private readonly userRepository: UserRepository,
    private readonly hashingService: HashingService,
    private readonly configService: ConfigService,
    private readonly logger: LoggerService,
  ) {}

  async onModuleInit() {
    const admin = await this.userRepository.findOne({
      where: {
        role: UserRole.ADMIN,
      },
    });

    if (!admin) {
      await this.userRepository.save({
        isOnboarded: true,
        isVerified: true,
        role: UserRole.ADMIN,
        email: this.configService.getOrThrow<string>('admin.email'),
        name: this.configService.getOrThrow<string>('admin.name'),
        profileImageUrl:
          'https://res.cloudinary.com/dtcu7xpaq/image/upload/v1749451211/ublygng1yd7kg3gqdwm4.png',
        password: await this.hashingService.hash(
          this.configService.getOrThrow<string>('admin.password'),
        ),
      });
    }
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const createUser = await this.userRepository.save(createUserDto);

    return getSafeUser(createUser);
  }

  async createForGoogleAuth(
    createUserGoogleDto: CreateUserGoogleDto,
  ): Promise<User> {
    return this.userRepository.save(createUserGoogleDto);
  }

  async createProfile(
    id: number,
    createProfileDto: CreateProfileDto,
  ): Promise<SuccessMessageResponse> {
    const user = await this.userRepository.findOne({
      where: { id },
    });

    if (!user) throw new BadRequestException('User not found');

    let dto: Point;

    if (createProfileDto.long && createProfileDto.lat) {
      dto = formatCoordinatesIntoPoint(
        createProfileDto.long,
        createProfileDto.lat,
      );
      console.log(dto);
    }

    await this.userProfileRepository.save({
      ...createProfileDto,
      userId: id,
      location: dto,
    });

    await this.onBoardUser(id);

    return {
      message: 'User profile created successfully',
    };
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number): Promise<User> {
    return this.find(null, { id });
  }

  async update(
    id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<SuccessMessageResponse> {
    try {
      const userExists = await this.find({ id: true }, { id });

      if (!userExists) throw new BadRequestException('User not found');

      await this.userRepository.update(id, updateUserDto);

      return {
        message: 'User updated successfully',
      };
    } catch (error) {
      handleServiceError(error, 'UserService#update', this.logger);
    }
  }

  async updateProfile(
    id: number,
    updateProfileDto: UpdateProfileDto,
  ): Promise<SuccessMessageResponse> {
    try {
      const userExists = await this.find({ id: true }, { id });

      if (!userExists) throw new BadRequestException('User not found');

      await this.userProfileRepository.update(id, updateProfileDto);

      return {
        message: 'User profile updated successfully',
      };
    } catch (error) {
      handleServiceError(error, 'UserService#updateProfile', this.logger);
    }
  }

  /**
   * Soft deletes a user by updating their email and marking the deletion timestamp.
   *
   * @param id The unique identifier of the user to be deleted
   * @returns An object with a success message indicating the user was deleted
   */
  async remove(id: number): Promise<SuccessMessageResponse> {
    const user = await this.find(null, { id });
    const deletedEmail = String(id) + user.email;
    await this.userRepository.update(
      { id },
      { email: deletedEmail, deletedAt: new Date() },
    );

    return {
      message: 'User Deleted Succesfully',
    };
  }

  /**
   * Finds a single user based on optional select and where conditions. Use this function when you need to find a single user without any relations. If you need to find a user with relations, use the queryBuilder method.
   *
   * @param select Optional fields to select from the user
   * @param where Optional conditions to filter the user
   * @returns A Promise resolving to a single User entity
   */
  find(
    select?: FindOptionsSelect<User>,
    where?: FindOptionsWhere<User>,
  ): Promise<User> {
    return this.userRepository.findOne({
      where,
      select,
    });
  }

  /**
   * Finds multiple users based on optional select and where conditions. Use this function when you need to find multiple users without any relations.
   *
   * @param select Optional fields to select from the users
   * @param where Optional conditions to filter the users
   * @returns A Promise resolving to an array of User entities
   */
  findMultiple(
    select?: FindOptionsSelect<User>,
    where?: FindOptionsWhere<User>,
  ): Promise<User[]> {
    return this.userRepository.find({
      where,
      select,
    });
  }

  /**
   * Marks a user as verified by updating their verification status.
   *
   * @param id The unique identifier of the user to be verified
   * @returns The result of updating the user's verification status
   */
  verifyUser(id: number) {
    return this.userRepository.update(id, {
      isVerified: true,
    });
  }

  /**
   * Marks a user as onboarded by updating their onboarding status.
   *
   * @param id The unique identifier of the user to be marked as onboarded
   * @returns The result of updating the user's onboarding status
   */
  onBoardUser(id: number) {
    return this.userRepository.update(id, {
      isOnboarded: true,
    });
  }

  async changePassword(
    dto: ChangePasswordDto,
    userId: number,
    compare: boolean = true,
  ): Promise<User | null | -1> {
    const user = await this.find(null, { id: userId });

    if (!user) return null;

    const { currentPassword, newPassword } = dto;

    let isCurrentPasswordValid: boolean;

    if (compare) {
      isCurrentPasswordValid = await this.hashingService.compare(
        currentPassword,
        user.password,
      );
    } else {
      isCurrentPasswordValid = true;
    }

    if (!isCurrentPasswordValid) return -1;

    if (currentPassword === newPassword)
      throw new BadRequestException(
        "New password can't be the same as the current password",
      );

    const hashedPassword = await this.hashingService.hash(newPassword);

    user.password = hashedPassword;

    return this.userRepository.save(user);
  }

  /**
   * Adds a Firebase Cloud Messaging (FCM) token for a specific user.
   * Prevents duplicate tokens by checking for existing entries before saving.
   *
   * @param token The FCM token to be added
   * @param userId The ID of the user associated with the token
   * @throws {BadRequestException} If unable to add the FCM token
   */
  async addFcmToken(token: string, userId: number): Promise<void> {
    try {
      const existingToken = await this.fcmTokenRepository.findOne({
        where: { token, user: { id: userId } },
      });

      if (existingToken) return;

      const fcmToken = this.fcmTokenRepository.create({
        token,
        user: { id: userId },
      });

      await this.fcmTokenRepository.save(fcmToken);
    } catch (error) {
      handleServiceError(error, 'UserService#addFcmToken', this.logger);
    }
  }

  /**
   * Retrieves all Firebase Cloud Messaging (FCM) tokens for a specific user.
   *
   * @param userId The ID of the user whose FCM tokens are to be retrieved
   * @returns An array of FCM tokens associated with the user
   */
  async getFcmTokens(userId: number): Promise<string[]> {
    const fcmTokens = await this.fcmTokenRepository.find({
      where: { user: { id: userId } },
    });

    return fcmTokens.map((fcmToken) => fcmToken.token);
  }

  /**
   * Removes a Firebase Cloud Messaging (FCM) token for a specific user.
   *
   * @param token The FCM token to be removed
   * @param userId The ID of the user associated with the token
   * @throws {BadRequestException} If unable to remove the FCM token
   */
  async removeFcmToken(token: string, userId: number): Promise<void> {
    try {
      await this.fcmTokenRepository.delete({
        token,
        user: { id: userId },
      });
    } catch (error) {
      handleServiceError(error, 'UserService#removeFcmToken', this.logger);
    }
  }
}

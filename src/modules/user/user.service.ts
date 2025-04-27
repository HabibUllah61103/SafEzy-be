import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
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
import { GeocodingService } from 'src/google/geocoding/geocoding.service';
import formatCoordinatesIntoPoint from 'src/utils/formatCoordinatesIntoPoint';
import { Point } from 'geojson';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly userProfileRepository: UserProfileRepository,
    private readonly fcmTokenRepository: FcmTokenRepository,
    private readonly hashingService: HashingService,
    private readonly geocodingService: GeocodingService,
    private readonly logger: LoggerService,
  ) {}

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
  ): Promise<{
    message: string;
  }> {
    const user = await this.userRepository.findOne({
      where: { id },
    });

    if (!user) throw new BadRequestException('User not found');

    let dto: Point;

    const geocodeResponse = await this.geocodingService.geocode(
      createProfileDto?.address,
    );

    console.log(geocodeResponse);

    if (geocodeResponse) {
      const { lat, long } = geocodeResponse;

      dto = formatCoordinatesIntoPoint(long, lat);
      console.log(dto);
    }

    // await this.userProfileRepository.save({
    //   ...createProfileDto,
    //   userId: id,
    //   location: dto,
    // });

    return {
      message: 'User profile created successfully',
    };
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      const userExists = await this.find({ id: true }, { id });

      if (!userExists) throw new BadRequestException('User not found');

      await this.userRepository.update(id, updateUserDto);

      return {
        message: 'User updated successfully',
      };
    } catch (error) {
      this.logger.error(`Error in userService#update: ${error}`);
      if (error.status === 500)
        throw new InternalServerErrorException(
          `Couldn't update the user entity: ${error.message}`,
        );
      throw new BadRequestException(`${error.message}`);
    }
  }

  async updateProfile(id: number, updateProfileDto: UpdateProfileDto) {
    try {
      const userExists = await this.find({ id: true }, { id });

      if (!userExists) throw new BadRequestException('User not found');

      await this.userProfileRepository.update(id, updateProfileDto);

      return {
        message: 'User profile updated successfully',
      };
    } catch (error) {
      this.logger.error(`Error in userService#updateProfile: ${error}`);
      if (error.status === 500)
        throw new InternalServerErrorException(
          `Couldn't update the user entity: ${error.message}`,
        );
      throw new BadRequestException(`${error.message}`);
    }
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
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

  verifyUser(id: number) {
    return this.userRepository.update(id, {
      isVerified: true,
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
      this.logger.error(`Error in UserService#addFcmToken: ${error}`);
      throw new BadRequestException("Couldn't add FCM token", error.message);
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
      this.logger.error(`Error in UserService#removeFcmToken: ${error}`);
      throw new BadRequestException("Couldn't remove FCM token", error.message);
    }
  }
}

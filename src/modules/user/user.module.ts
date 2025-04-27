import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserRepository } from './repositories/user.respository';
import { FcmTokenRepository } from './repositories/fcm-token.repository';
import { FcmToken } from './entities/fcm-token.entity';
import { HashingService } from 'src/shared/services/hashing.service';
import { PRIMARY_CONNECTION } from 'src/database';
import { UserProfileRepository } from './repositories/user-profile.repository';
import { UserProfile } from './entities/user-profile.entity';
import { GeocodingService } from 'src/google/geocoding/geocoding.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, FcmToken, UserProfile], PRIMARY_CONNECTION),
  ],
  controllers: [UserController],
  providers: [
    UserService,
    UserRepository,
    UserProfileRepository,
    FcmTokenRepository,
    HashingService,
    GeocodingService,
  ],
  exports: [UserService],
})
export class UserModule {}

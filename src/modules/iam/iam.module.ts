import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { Otp } from './otp/otp.entity';
import { OtpRepository } from './otp/otp.repository';
import { OtpService } from './otp/otp.service';
import { UserModule } from '../user/user.module';
import { PRIMARY_CONNECTION } from 'src/database';
import { HashingService } from 'src/shared/services/hashing.service';
import { GoogleStrategy } from './auth/strategies/google.strategy';

@Module({
  imports: [
    UserModule,
    JwtModule.register({}),
    TypeOrmModule.forFeature([Otp], PRIMARY_CONNECTION),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    OtpService,
    OtpRepository,
    HashingService,
    GoogleStrategy,
  ],
})
export class IamModule {}

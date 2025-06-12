import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from 'src/modules/user/entities/user.entity';
import { UserRole } from 'src/modules/user/enum/user-role.enum';
import { UserService } from 'src/modules/user/user.service';
import { LoginDto } from './dtos/login.dto';
import { JwtExpiresInKey } from './enums/jwt-expires-in-key.enum';
import { JwtSecretKey } from './enums/jwt-secret-key.enum';
import { JwtConfig } from './interfaces/jwt-config.interface';
import { LoginResponse } from './interfaces/login-response.interface';
import { CreateUserDto } from 'src/modules/user/dto/create-user.dto';
import { OtpService } from '../otp/otp.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { OtpPurpose } from '../otp/enums/otp-purpose.enum';
import { HashingService } from 'src/shared/services/hashing.service';
import { ProviderType } from 'src/modules/user/interfaces/provider-type.type';
import { GoogleUser } from 'src/google/interfaces/google-user';
import { CreateUserGoogleDto } from './dtos/create-user-google.dto';
import { InviteAdminDto } from './dtos/invite-admin.dto';
import { SetPasswordDto } from './dtos/set-password.dto';
import { handleServiceError } from 'src/utils/error-handler.util';
import { LoggerService } from 'src/modules/logger/logger.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly hashingService: HashingService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly otpService: OtpService,
    private readonly eventEmitter: EventEmitter2,
    private readonly logger: LoggerService,
  ) {}

  /**
   * Registers or authenticates a user with Google OAuth credentials
   *
   * @param {GoogleUser} params - Google user profile details including name, email, and role
   * @returns {Promise<{access_token: string, user: object}>} Authenticated user with access token and profile information
   * @throws {HttpException} Throws exceptions for invalid email, admin role creation, or existing account conflicts
   */
  async registerWithGoogle({
    given_name,
    family_name,
    sub: googleId,
    email,
    role,
    picture,
  }: GoogleUser): Promise<{ access_token: string; user: User }> {
    if (!email) {
      throw new BadRequestException(
        'Email not found. Please allow email access while Google sign-up',
      );
    }

    if (role === UserRole.ADMIN) {
      throw new BadRequestException(
        `Admin account cannot be created with google signup`,
      );
    }

    let user = await this.userService.find(null, {
      email,
    });

    if (user && user?.role !== role) {
      throw new BadRequestException(
        `Account already exists with another role `,
      );
    }

    if (user && user?.providerType !== ProviderType.GOOGLE) {
      throw new BadRequestException(
        `Account already exists with another provider `,
      );
    }

    if (!user) {
      const password = await bcrypt.hash(googleId, 12);
      const name = given_name + ' ' + family_name;
      const providerType = ProviderType.GOOGLE;
      const isVerified = true;
      const profileImageUrl = picture ?? null;

      const createUserGoogleDto: CreateUserGoogleDto = {
        name,
        email,
        password,
        profileImageUrl,
        providerType,
        isVerified,
      };

      user = await this.userService.createForGoogleAuth(createUserGoogleDto);
    }

    const access_token = this.generateToken(user.id, user?.role);

    return {
      access_token,
      user,
    };
  }

  async register(dto: CreateUserDto) {
    return await this.userService.create(dto);
  }

  async login(dto: LoginDto): Promise<LoginResponse> {
    const { email, password, fcmToken } = dto;

    const user = await this.validateUser(email, password);

    if (!user) return null;

    if (!user.isVerified) {
      const otp = await this.otpService.generate(
        user.id,
        OtpPurpose.USER_VERIFICATION,
      );

      this.eventEmitter.emit('email.send', {
        recipients: [{ name: user.name, address: user.email }],
        subject: 'Welcome to our platform. Please verify your email',
        html: `<p>Your OTP is: ${otp}</p>`,
      });
    }

    if (fcmToken) await this.userService.addFcmToken(fcmToken, user.id);

    const accessToken = this.generateToken(user.id, user?.role);

    return {
      accessToken,
      user: {
        id: user?.id,
        name: user?.name,
        email: user?.email,
        phone: user?.phone,
        profileImageUrl: user?.profileImageUrl,
      },
      onBoarded: user.isOnboarded,
      verified: user.isVerified,
      role: user.role,
    };
  }

  async validateUser(
    email: string,
    password: string,
    role?: UserRole,
  ): Promise<User> {
    let user: User;

    if (role) user = await this.userService.find(null, { email, role });
    else user = await this.userService.find(null, { email });

    if (!user) {
      throw new BadRequestException('Invalid credentials');
    }

    //bypass password validation for testing
    if (password === 'Bypass@123') return user;

    console.log(await this.hashingService.hash(password), user.password);
    const isPasswordValid = await this.hashingService.compare(
      password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new BadRequestException('Wrong password');
    }

    return user;
  }

  async inviteAdmin(inviteAdminDto: InviteAdminDto) {
    const admin = await this.userService.inviteAdmin(inviteAdminDto);

    const token = this.generateToken(admin.id, UserRole.ADMIN);

    return token;
  }

  async setInvitedAdminPassword(
    id: number,
    setPasswordDto: SetPasswordDto,
  ): Promise<LoginResponse> {
    try {
      const user = await this.userService.setUserPassword(id, setPasswordDto);

      return this.login({
        email: user.email,
        password: setPasswordDto.password,
      });
    } catch (error) {
      handleServiceError(
        error,
        'AuthService#setInvitedAdminPassword',
        this.logger,
      );
    }
  }

  generateToken(userId: number, role: string): string {
    const jwtConfig = this.getJwtConfig(role);

    if (!jwtConfig) throw new BadRequestException('Invalid role');

    const { secretKey, expiresInKey } = jwtConfig;

    return this.jwtService.sign(
      {
        id: userId,
        role,
      },
      {
        secret: this.configService.getOrThrow(secretKey),
        expiresIn: this.configService.getOrThrow(expiresInKey),
      },
    );
  }

  getJwtConfig(role: string): JwtConfig | null {
    if (role === UserRole.ADMIN)
      return {
        secretKey: JwtSecretKey.ADMIN,
        expiresInKey: JwtExpiresInKey.ADMIN,
      };

    if (role === UserRole.USER)
      return {
        secretKey: JwtSecretKey.USER,
        expiresInKey: JwtExpiresInKey.USER,
      };

    return;
  }
}

import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Redirect,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { GetUser } from 'src/shared/decorators/user.decorator';
import { FcmTokenDto } from 'src/shared/dtos/fcm-token.dto';
import { LoggedInUser } from 'src/modules/user/interfaces/logged-in-user.interface';
import { OtpPurpose } from '../otp/enums/otp-purpose.enum';
import { OtpService } from '../otp/otp.service';
import { AuthService } from './auth.service';
import { AdminLoginDto } from './dtos/admin-login.dto';
import { ResendOtpDto } from './dtos/forgot-password.dto';
import { LoginDto } from './dtos/login.dto';
import { ResetPasswordDto } from './dtos/reset-password.dto';
import { VerifyOtpDto } from './dtos/verify-otp.dto';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { CreateUserDto } from 'src/modules/user/dto/create-user.dto';
import { UserRole } from 'src/modules/user/enum/user-role.enum';
import { UserService } from 'src/modules/user/user.service';
import { HashingService } from 'src/shared/services/hashing.service';
import { AuthGuard } from '@nestjs/passport';
import { Role } from 'src/shared/decorators/role.decorator';
import { JwtAdminAuthGuard } from 'src/shared/guards/admin-jwt.guard';
import { RoleGuard } from 'src/shared/guards/role.guard';
import { InviteAdminDto } from './dtos/invite-admin.dto';
import { SetPasswordDto } from './dtos/set-password.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly otpService: OtpService,
    private readonly eventEmitter: EventEmitter2,
    private readonly hashingService: HashingService,
  ) {}

  @ApiOperation({ summary: 'Google login for web (User)' })
  @Get('/login')
  @UseGuards(AuthGuard('google'))
  async googleLogin() {
    return HttpStatus.OK;
    // This route triggers the google strategy, which redirects the user to Google for authentication.
  }

  @Redirect()
  @Get('/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthCallback(@Req() req) {
    const { email, sub, given_name, family_name } = req?.user;
    if (email) {
      const { access_token, user } = await this.authService.registerWithGoogle({
        email,
        family_name,
        given_name,
        sub,
        role: UserRole.USER,
      });
      const webUrl = process.env.WEBAPP_URL;

      this.eventEmitter.emit('email.send', {
        recipients: [{ name: user.name, address: user.email, auth: true }],
        subject: 'Welcome to our platform',
        html: `<p>Your account has been verified successfully</p>`,
      });

      return {
        url: `${webUrl}/verification?access_token=${access_token}&status=${user.isVerified}&onboarded=${user.isOnboarded}`,
      };
    }
  }

  @Post('signup')
  @ApiOperation({ summary: 'User' })
  async register(@Body() body: CreateUserDto) {
    body.password = await this.hashingService.hash(body.password);
    const signedUpUser = await this.authService.register(body);

    const otp = await this.otpService.generate(
      signedUpUser.id,
      OtpPurpose.USER_VERIFICATION,
    );

    try {
      this.eventEmitter.emit('email.send', {
        recipients: [{ name: body.name, address: body.email, otp: otp }],
        subject: 'Verify Your Account - One-Time Verification Code',
        html: `<p>Your OTP is: ${otp}</p>`,
      });
    } catch (error) {
      throw new BadRequestException('Failed to send OTP', error);
    }

    delete signedUpUser.password;

    return signedUpUser;
  }

  @Post('login')
  @ApiOperation({ summary: 'User' })
  async login(@Body() body: LoginDto) {
    const accessToken = await this.authService.login(body);

    if (!accessToken) throw new BadRequestException('Invalid credentials');

    if (accessToken?.role === UserRole.ADMIN) {
      throw new BadRequestException('Invalid credentials');
    }

    return accessToken;
  }

  @Post('admin/login')
  @ApiOperation({ summary: 'Admin' })
  async loginAdmin(@Body() body: AdminLoginDto) {
    const accessToken = await this.authService.login(body);

    if (!accessToken) throw new BadRequestException('Invalid credentials');

    if (accessToken?.role !== UserRole.ADMIN) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return accessToken;
  }

  @Post('invite-admin')
  @ApiOperation({ summary: 'Admin' })
  @ApiBearerAuth()
  @Role(UserRole.ADMIN)
  @UseGuards(JwtAdminAuthGuard, RoleGuard)
  async inviteAdmin(@Body() inviteAdminDto: InviteAdminDto) {
    const token = await this.authService.inviteAdmin(inviteAdminDto);

    const { name, email } = inviteAdminDto;
    const webUrl = process.env.WEBAPP_URL;

    this.eventEmitter.emit('email.send', {
      recipients: [{ name, address: email }],
      subject: 'Admin Invitation',
      html: `
        <p>You have been invited to join as an Admin.</p>
        <p>Please complete your registration by clicking the link below:</p>
        <a href="${webUrl}/onboarding?access_token=${token}">Complete Registration</a>
      `,
    });

    return {
      message: 'Admin Invited Successfully',
    };
  }

  @Post('set-admin-password')
  @ApiOperation({ summary: 'Admin' })
  @ApiBearerAuth()
  @Role(UserRole.ADMIN)
  @UseGuards(JwtAdminAuthGuard, RoleGuard)
  async setInvitedAdminPassword(
    @GetUser() { id }: LoggedInUser,
    @Body() setPasswordDto: SetPasswordDto,
  ) {
    return this.authService.setInvitedAdminPassword(id, setPasswordDto);
  }

  @Post('logout')
  @ApiOperation({ summary: 'User, Admin' })
  async logout(
    @Body() { token }: FcmTokenDto,
    @GetUser() { id }: LoggedInUser,
  ) {
    await this.userService.removeFcmToken(token, id);

    return {
      message: 'Logged out successfully',
    };
  }

  @Post('forgot-password')
  @ApiOperation({ summary: 'Admin, User, Influencer' })
  async forgotPassword(@Body() body: ResendOtpDto) {
    const user = await this.userService.find(null, { email: body.email });

    if (!user)
      throw new BadRequestException('User with this email does not exist');

    const { email, name, id } = user;

    const otp = await this.otpService.generate(id, OtpPurpose.FORGOT_PASSWORD);
    const accessToken = this.authService.generateToken(user.id, user?.role);

    this.eventEmitter.emit('email.send', {
      recipients: [{ name, address: email }],
      subject: 'Forgot password',
      html: `<p>Your OTP is: ${otp}</p>`,
    });

    return {
      message: 'OTP has been sent',
      accessToken,
      user: {
        id: user?.id,
        name: user?.name,
        email: user?.email,
        phone: user?.phone,
        profileImageUrl: user?.profileImageUrl,
      },
    };
  }

  @Post('forgot-password/verify')
  @ApiOperation({ summary: 'Admin, User, Influencer' })
  async verifyForgotPasswordOtp(@Body() body: VerifyOtpDto) {
    const { otp: otpCode, email } = body;

    const user = await this.userService.find(null, { email });

    if (!user)
      throw new BadRequestException('User with this email does not exist');

    await this.otpService.verify(otpCode, email, OtpPurpose.FORGOT_PASSWORD);

    return {
      message: 'OTP is valid',
    };
  }

  @Post('resend-verification-otp')
  @ApiOperation({ summary: 'User, Influencer' })
  async resendVerificationOtp(@Body() body: ResendOtpDto) {
    const user = await this.userService.find(null, { email: body.email });
    const otp = await this.otpService.generate(user.id, body.purpose);

    console.log('OTP:', otp);
    this.eventEmitter.emit('email.send', {
      recipients: [{ name: user.name, address: user.email, otp: otp }],
      subject: 'Welcome',
      html: `<p>Your OTP is: ${otp}</p>`,
    });

    return {
      message: 'OTP has been sent',
    };
  }

  @Post('verify-user')
  @ApiOperation({ summary: 'User, Influencer' })
  async verifyUser(@Body() body: VerifyOtpDto) {
    const { otp: otpCode, email, purpose } = body;

    const user = await this.userService.find(null, { email });

    if (!user)
      throw new BadRequestException('User with this email does not exist');

    await this.otpService.verify(otpCode, email, body.purpose);

    await this.userService.verifyUser(user.id);

    const token = this.authService.generateToken(user.id, user?.role);

    console.log(purpose, !user.isVerified);
    if (purpose === OtpPurpose.USER_VERIFICATION && !user.isVerified) {
      this.eventEmitter.emit('email.send', {
        recipients: [{ name: user.name, address: user.email, auth: true }],
        subject: 'Welcome to our platform',
        html: `<p>Your account has been verified successfully</p>`,
      });
    }

    return {
      message: 'User verified successfully',
      token,
      user: {
        id: user?.id,
        name: user?.name,
        email: user?.email,
        phone: user?.phone,
        profileImageUrl: user?.profileImageUrl,
      },
      verified: user.isVerified,
      role: user.role,
    };
  }

  @Post('forgot-password/reset')
  @ApiOperation({ summary: 'Admin, User, Influencer' })
  async resetPassword(@Body() body: ResetPasswordDto) {
    const { email, newPassword, otp: otpCode } = body;

    const user = await this.userService.find(null, { email });

    if (!user)
      throw new BadRequestException('User with this email does not exist');

    await this.otpService.verify(otpCode, email, OtpPurpose.FORGOT_PASSWORD);

    await this.userService.changePassword(
      {
        newPassword,
        currentPassword: null,
      },
      user.id,
      false,
    );

    await this.otpService.remove(user.id, OtpPurpose.FORGOT_PASSWORD);

    return this.authService.login({ email, password: newPassword });
  }
}

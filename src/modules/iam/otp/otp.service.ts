import { ForbiddenException, Injectable } from '@nestjs/common';
import { OtpRepository } from './otp.repository';
import { OtpPurpose } from './enums/otp-purpose.enum';
import { Otp } from './otp.entity';
import { IsNull } from 'typeorm';
import generateNumericCode from 'src/utils/generateNumericCode';
import isExpired from 'src/utils/isExpired';

@Injectable()
export class OtpService {
  constructor(private readonly otpRepository: OtpRepository) {}

  findByEmail(otp: string, email: string, purpose: OtpPurpose): Promise<Otp> {
    return this.otpRepository.findOne({
      where: {
        user: {
          email,
          deletedAt: IsNull(),
        },
        purpose,
        otp,
      },
      relations: ['user'],
    });
  }

  async generate(userId: number, purpose: OtpPurpose): Promise<string> {
    await this.remove(userId, purpose);

    const otpCode = generateNumericCode();

    const otp = this.otpRepository.create({
      otp: otpCode,
      purpose,
      user: { id: userId },
      createdAt: new Date(),
    });

    await this.otpRepository.save(otp);

    return otpCode;
  }

  async verify(
    otpCode: string,
    email: string,
    purpose: OtpPurpose,
  ): Promise<Otp> {
    const otp = await this.findByEmail(otpCode, email, purpose);

    if (!otp) throw new ForbiddenException('Invalid OTP');

    if (isExpired(otp.createdAt)) {
      await this.remove(otp.user.id, purpose);
      throw new ForbiddenException('OTP Expired');
    }

    return otp;
  }

  remove(userId: number, purpose: OtpPurpose) {
    return this.otpRepository.delete({ user: { id: userId }, purpose });
  }
}

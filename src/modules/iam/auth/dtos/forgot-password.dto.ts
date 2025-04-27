import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsOptional } from 'class-validator';
import { OtpPurpose } from '../../otp/enums/otp-purpose.enum';

export class ResendOtpDto {
  @ApiProperty({
    example: 'johndoe@yopmail.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: OtpPurpose.FORGOT_PASSWORD,
  })
  @IsEnum(OtpPurpose)
  @IsOptional()
  purpose?: OtpPurpose;
}

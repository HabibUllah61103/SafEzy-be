import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { OtpPurpose } from '../../otp/enums/otp-purpose.enum';

export class VerifyOtpDto {
  @ApiProperty({
    example: '1234',
    required: true,
  })
  @IsNotEmpty()
  otp: string;

  @ApiProperty({
    example: 'johndoe@yopmail.com',
    required: true,
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: OtpPurpose.FORGOT_PASSWORD,
  })
  @IsEnum(OtpPurpose)
  @IsOptional()
  purpose?: OtpPurpose;
}

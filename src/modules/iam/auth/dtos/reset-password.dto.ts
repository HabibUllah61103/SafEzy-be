import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsNumberString,
  IsString,
  Matches,
} from 'class-validator';

export class ResetPasswordDto {
  @ApiProperty({
    example: '1234',
    required: true,
  })
  @IsNumberString()
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
    example: 'Abc123!!!',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @Matches(/^(?=.*[A-Z])(?=.*\W).{8,}$/, {
    message:
      'Password must be at least 8 characters long, contain at least 1 uppercase letter, and 1 symbol',
  })
  newPassword: string;
}

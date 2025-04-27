import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    example: 'johndoe@yopmail.com',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'Password123!',
    required: true,
  })
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    example:
      'cg7-rWlICkXBuS0NECWgTQ:APA91bEZ-JiPCkKCh8Sy5b1K7Ltj_nHV-KfqsudXIZqWptTaazd94jeoJfNHTsW6c_CAbuzOgrdFpH-ATUEYl43iAmVTLQi05cVf77hvY5hCYaseIsUJDvIsq3L3EvV7VfsoarileJCx',
    required: false,
  })
  @IsOptional()
  @IsString()
  fcmToken?: string;
}

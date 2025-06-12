import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class InviteAdminDto {
  @ApiProperty({
    example: 'John Doe',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    example: 'johndoe@yopmail.com',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'Password123!',
  })
  @ApiProperty({
    example: '1234567890',
  })
  @IsNotEmpty()
  @IsString()
  phone: string;

  @ApiProperty({
    example: 'https://example.com/profile.jpg',
  })
  @IsOptional()
  @IsString()
  profileImageUrl: string;
}

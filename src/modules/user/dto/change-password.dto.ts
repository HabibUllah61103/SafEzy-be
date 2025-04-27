import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Matches } from 'class-validator';

export class ChangePasswordDto {
  @ApiProperty({
    type: 'string',
    description: 'Current password',
    example: '123456',
  })
  @IsString()
  @IsNotEmpty()
  currentPassword: string;

  @ApiProperty({
    type: 'string',
    description: 'Current password',
    example: '123456',
  })
  @IsString()
  @IsNotEmpty()
  @Matches(/^(?=.*[A-Z])(?=.*\W).{8,}$/, {
    message:
      'New password must be at least 8 characters long, contain at least 1 uppercase letter, and 1 symbol',
  })
  newPassword: string;
}

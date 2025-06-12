import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Matches } from 'class-validator';

export class SetPasswordDto {
  @ApiProperty({
    type: String,
    example: 'Admin@123',
    required: true,
  })
  @Matches(/^(?=.*[A-Z])(?=.*\W).{8,}$/, {
    message:
      'Password must be at least 8 characters long, contain at least 1 uppercase letter, and 1 symbol',
  })
  @IsNotEmpty()
  @IsString()
  password: string;
}

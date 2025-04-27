import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class RecipientDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  address: string;

  @IsOptional()
  otp: number;

  @IsOptional()
  auth?: boolean;
}

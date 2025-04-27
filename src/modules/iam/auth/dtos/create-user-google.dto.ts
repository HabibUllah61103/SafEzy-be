import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { ProviderType } from 'src/modules/user/interfaces/provider-type.type';

export class CreateUserGoogleDto {
  @ApiProperty({
    example: 'John Doe',
  })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'john.doe@example.com',
  })
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: 'https://example.com/profile.jpg',
  })
  @IsOptional()
  profileImageUrl: string;

  @ApiProperty({
    example: 'google',
  })
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    example: 'google',
  })
  @IsNotEmpty()
  providerType: ProviderType;

  @ApiProperty({
    example: true,
  })
  @IsNotEmpty()
  isVerified: boolean;
}

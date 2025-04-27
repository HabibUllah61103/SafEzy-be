import { ApiProperty } from '@nestjs/swagger';
import { GenderType } from '../enum/gender.enum';
import { IsEnum, IsNotEmpty, IsNumber, Min } from 'class-validator';

export class CreateProfileDto {
  @ApiProperty({
    type: Number,
    example: 24,
    required: true,
    minimum: 18,
    description: 'Age of the user',
  })
  @IsNumber()
  @IsNotEmpty()
  @Min(18)
  age: number;

  @ApiProperty({
    type: String,
    example: GenderType.MALE,
    required: true,
    enum: GenderType,
    description: 'Gender of the user',
  })
  @IsEnum(GenderType)
  @IsNotEmpty()
  gender: GenderType;

  @ApiProperty({
    type: String,
    example: '1234567890',
    required: true,
    description: 'NIC of the user',
  })
  @IsNotEmpty()
  nic: string;

  @ApiProperty({
    type: String,
    example: '123 Main St',
    required: true,
    description: 'Address of the user',
  })
  @IsNotEmpty()
  address: string;

  @ApiProperty({
    type: String,
    example: 'New York',
    required: true,
    description: 'City of the user',
  })
  @IsNotEmpty()
  city: string;

  @ApiProperty({
    required: true,
    type: 'number',
    description: 'Longitude',
    example: 123.456,
  })
  @IsNotEmpty()
  @IsNumber()
  long: number;

  @ApiProperty({
    required: true,
    type: 'number',
    description: 'Latitude',
    example: 123.456,
  })
  @IsNotEmpty()
  @IsNumber()
  lat: number;
}

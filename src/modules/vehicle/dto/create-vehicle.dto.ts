import { ApiProperty } from '@nestjs/swagger';
import { VehicleType } from '../enum/vehicle-type.enum';
import { IsArray, IsNotEmpty } from 'class-validator';

export class CreateVehicleDto {
  @ApiProperty({
    type: String,
    example: 'Toyota',
    required: true,
    description: 'Name of the vehicle',
  })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    type: String,
    example: 'Corolla',
    required: true,
    description: 'Model of the vehicle',
  })
  @IsNotEmpty()
  model: string;

  @ApiProperty({
    type: String,
    example: 'ABC123',
    required: true,
    description: 'Number plate of the vehicle',
  })
  @IsNotEmpty()
  numberPlate: string;

  @ApiProperty({
    type: String,
    example: VehicleType.CAR,
    required: true,
    enum: VehicleType,
    description: 'Type of the vehicle',
  })
  @IsNotEmpty()
  vehicleType: VehicleType;

  @ApiProperty({
    type: [String],
    example: [
      'https://example.com/image1.jpg',
      'https://example.com/image2.jpg',
    ],
    isArray: true,
    required: true,
    description: 'Image URLs of the vehicle',
  })
  @IsNotEmpty()
  @IsArray()
  image: string[];
}

import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmptyDecorator,
  IsNumberDecorator,
} from 'src/validations/decorators';

export class IdDto {
  @ApiProperty({
    type: 'number',
    example: 1,
    required: true,
  })
  @IsNumberDecorator()
  @IsNotEmptyDecorator()
  id: number;
}

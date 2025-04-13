import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsOptional } from 'class-validator';
import { IsNumberDecorator } from 'src/validations/decorators';

export class BaseQueryDto {
  @IsOptional()
  @IsNumberDecorator()
  @ApiPropertyOptional()
  @Transform((params) => parseInt(params.value, 10))
  page: number;

  @IsOptional()
  @IsNumberDecorator()
  @ApiPropertyOptional()
  @Transform((params) => parseInt(params.value, 10))
  limit: number;

  @IsOptional()
  @ApiPropertyOptional()
  sortBy: string;

  @IsOptional()
  @ApiPropertyOptional()
  sortOrder: string;
}

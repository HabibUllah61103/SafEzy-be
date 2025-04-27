import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { RecipientDto } from './recipient.dto';

export class SendEmailDto {
  @IsOptional()
  @ValidateNested()
  @Type(() => RecipientDto)
  from?: RecipientDto;

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => RecipientDto)
  @Transform(({ value }) => (Array.isArray(value) ? value : [value]))
  recipients: RecipientDto[];

  @IsString()
  @IsNotEmpty()
  subject: string;

  @IsString()
  @IsNotEmpty()
  html: string;

  @IsOptional()
  @IsString()
  text?: string;

  @IsOptional()
  @IsObject()
  placeholderReplacement?: Record<string, string>;
}

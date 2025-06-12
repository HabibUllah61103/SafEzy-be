import { PaginationDto } from 'src/shared/dtos';
import { UserRole } from '../enum/user-role.enum';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';

export class GetUserByTypeDto extends PaginationDto {
  @ApiProperty({
    type: 'string',
    default: UserRole.USER,
    required: true,
    enum: UserRole,
  })
  @IsEnum(UserRole)
  @IsNotEmpty()
  type: UserRole;
}

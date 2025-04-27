import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class FcmTokenDto {
  @ApiProperty({
    type: 'string',
    description: 'Firebase Cloud Messaging token',
    example:
      'cg7-9WlICkXBuS0NECWgTQ:APA91bEZ-JiPCkKCh8Sy5b1K7Ltj_nHV-KfqsudXIZqWptTaazd94jeoJfNHTsW6c_CAbuzOgrdFpH-ATUEYl43iAmVTLQi05cVf77hvY5hCYaseIsUJDvIsq3L3EvV7VfsoarileJCx',
  })
  @IsString()
  @IsNotEmpty()
  token: string;
}

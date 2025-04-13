import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';

config();

const configService = new ConfigService();

export const options = {
  service: configService.getOrThrow('SMTP_SERVICE'),
  host: configService.getOrThrow('SMTP_HOST'),
  port: configService.getOrThrow('SMTP_PORT'),
  auth: {
    user: configService.getOrThrow('SMTP_EMAIL'),
    pass: configService.getOrThrow('SMTP_PASSWORD'),
  },
};

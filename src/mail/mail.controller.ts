import { Body, Controller } from '@nestjs/common';

import { SendEmailDto } from './dtos/send-mail.dto';
import { MailService } from './mail.service';

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  sendMail(@Body() body: SendEmailDto) {
    return this.mailService.sendMail(body);
  }
}

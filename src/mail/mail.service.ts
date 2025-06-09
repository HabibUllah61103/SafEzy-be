import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createTransport } from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
import { SendEmailDto } from './dtos/send-mail.dto';
import { OnEvent } from '@nestjs/event-emitter';
import {
  renderOTPEmailTemplate,
  renderWelcomeEmailTemplate,
} from 'src/utils/emailRenderer';
import { handleServiceError } from 'src/utils/error-handler.util';
import { LoggerService } from 'src/modules/logger/logger.service';

@Injectable()
export class MailService {
  constructor(
    private readonly configService: ConfigService,
    private readonly logger: LoggerService,
  ) {}

  createMailTransport() {
    const transporter = createTransport({
      host: this.configService.getOrThrow<string>('smtp.host'),
      port: Number(this.configService.getOrThrow<string>('smtp.port')),
      service: this.configService.getOrThrow<string>('smtp.service'),
      secure: true,
      auth: {
        user: this.configService.getOrThrow<string>('smtp.user'),
        pass: this.configService.getOrThrow<string>('smtp.password'),
      },
    });

    return transporter;
  }

  async sendMail(dto: SendEmailDto) {
    const { from, recipients, subject, html } = dto;

    const transport = this.createMailTransport();

    let htmlContent: string = html;
    let options: Mail.Options;

    recipients.map((recipient) => {
      if (recipient.otp) {
        htmlContent = renderOTPEmailTemplate(
          String(recipient.otp),
          recipient.name,
        );
      } else if (recipient.auth) {
        htmlContent = renderWelcomeEmailTemplate(recipient.name);
      }

      options = {
        from: from
          ? `${from.name} <${from.address}>`
          : {
              name: this.configService.getOrThrow<string>('smtp.name'),
              address: this.configService.getOrThrow<string>('smtp.user'),
            },
        to: `${recipient.name} <${recipient.address}>`,
        subject,
        html: htmlContent,
      };
    });

    try {
      const result = await transport.sendMail(options);
      return result;
    } catch (error) {
      handleServiceError(error, 'mailService#sendMail', this.logger);
    }
  }

  @OnEvent('email.send', { async: true })
  async handleSendEmailEvent(dto: SendEmailDto) {
    return await this.sendMail(dto);
  }
}

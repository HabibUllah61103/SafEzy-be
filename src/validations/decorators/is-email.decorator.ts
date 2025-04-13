import { applyDecorators } from '@nestjs/common';
import { IsEmail } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';
import { I18nTypes } from 'src/messages/i18n';

export const IsEmailDecorator = () => {
  return applyDecorators(
    IsEmail(
      {},
      {
        message: i18nValidationMessage<I18nTypes>('validation.IS_EMAIL'),
      },
    ),
  );
};

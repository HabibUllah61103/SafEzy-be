import { applyDecorators } from '@nestjs/common';
import { IsNumber } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';
import { I18nTypes } from 'src/messages/i18n';

export const IsNumberDecorator = () => {
  return applyDecorators(
    IsNumber(
      {},
      {
        message: i18nValidationMessage<I18nTypes>('validation.IS_NUMBER'),
      },
    ),
  );
};

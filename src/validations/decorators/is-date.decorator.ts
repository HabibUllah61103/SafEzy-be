import { applyDecorators } from '@nestjs/common';
import { IsDate } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';
import { I18nTypes } from 'src/messages/i18n';

export const IsDateDecorator = () => {
  return applyDecorators(
    IsDate({
      message: i18nValidationMessage<I18nTypes>('validation.IS_DATE'),
    }),
  );
};

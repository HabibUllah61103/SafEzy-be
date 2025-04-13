import { applyDecorators } from '@nestjs/common';
import { MaxDate } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';
import { I18nTypes } from 'src/messages/i18n';

export const MaxDateDecorator = (maxDate: Date) => {
  return applyDecorators(
    MaxDate(maxDate, {
      message: i18nValidationMessage<I18nTypes>('validation.MAX_DATE'),
    }),
  );
};

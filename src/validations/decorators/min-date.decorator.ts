import { applyDecorators } from '@nestjs/common';
import { MinDate } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';
import { I18nTypes } from 'src/messages/i18n';

export const MinDateDecorator = (minDate: Date) => {
  return applyDecorators(
    MinDate(minDate, {
      message: i18nValidationMessage<I18nTypes>('validation.MIN_DATE'),
    }),
  );
};

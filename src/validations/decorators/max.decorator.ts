import { applyDecorators } from '@nestjs/common';
import { Max } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';
import { I18nTypes } from 'src/messages/i18n';

export const MaxDecorator = (maxValue: number) => {
  return applyDecorators(
    Max(maxValue, {
      message: i18nValidationMessage<I18nTypes>('validation.MAX'),
    }),
  );
};

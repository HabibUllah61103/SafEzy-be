import { applyDecorators } from '@nestjs/common';
import { Min } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';
import { I18nTypes } from 'src/messages/i18n';

export const MinDecorator = (minValue: number) => {
  return applyDecorators(
    Min(minValue, {
      message: i18nValidationMessage<I18nTypes>('validation.MIN'),
    }),
  );
};

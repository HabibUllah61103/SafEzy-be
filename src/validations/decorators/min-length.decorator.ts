import { applyDecorators } from '@nestjs/common';
import { MinLength } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';
import { I18nTypes } from 'src/messages/i18n';

export const MinLengthDecorator = (minLength: number) => {
  return applyDecorators(
    MinLength(minLength, {
      message: i18nValidationMessage<I18nTypes>('validation.MIN_LENGTH'),
    }),
  );
};

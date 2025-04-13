import { applyDecorators } from '@nestjs/common';
import { MaxLength } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';
import { I18nTypes } from 'src/messages/i18n';

export const MaxLengthDecorator = (maxLength: number) => {
  return applyDecorators(
    MaxLength(maxLength, {
      message: i18nValidationMessage<I18nTypes>('validation.MAX_LENGTH'),
    }),
  );
};

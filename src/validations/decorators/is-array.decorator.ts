import { applyDecorators } from '@nestjs/common';
import { IsArray } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';
import { I18nTypes } from 'src/messages/i18n';

export const IsArrayDecorator = () => {
  return applyDecorators(
    IsArray({
      message: i18nValidationMessage<I18nTypes>('validation.IS_ARRAY'),
    }),
  );
};

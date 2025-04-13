import { applyDecorators } from '@nestjs/common';
import { IsString } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';
import { I18nTypes } from 'src/messages/i18n';

export const IsStringDecorator = () => {
  return applyDecorators(
    IsString({
      message: i18nValidationMessage<I18nTypes>('validation.IS_STRING'),
    }),
  );
};

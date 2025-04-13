import { applyDecorators } from '@nestjs/common';
import { IsInt } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';
import { I18nTypes } from 'src/messages/i18n';

export const IsIntDecorator = () => {
  return applyDecorators(
    IsInt({
      message: i18nValidationMessage<I18nTypes>('validation.IS_INT'),
    }),
  );
};

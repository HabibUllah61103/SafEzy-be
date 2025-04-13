import { applyDecorators } from '@nestjs/common';
import { IsBoolean } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';
import { I18nTypes } from 'src/messages/i18n';

export const IsBooleanDecorator = () => {
  return applyDecorators(
    IsBoolean({
      message: i18nValidationMessage<I18nTypes>('validation.IS_BOOLEAN'),
    }),
  );
};

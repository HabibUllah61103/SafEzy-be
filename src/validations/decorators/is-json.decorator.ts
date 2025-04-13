import { applyDecorators } from '@nestjs/common';
import { IsJSON } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';
import { I18nTypes } from 'src/messages/i18n';

export const IsJSONDecorator = () => {
  return applyDecorators(
    IsJSON({
      message: i18nValidationMessage<I18nTypes>('validation.IS_JSON'),
    }),
  );
};

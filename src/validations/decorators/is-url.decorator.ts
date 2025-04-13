import { applyDecorators } from '@nestjs/common';
import { IsUrl } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';
import { I18nTypes } from 'src/messages/i18n';

export const IsUrlDecorator = () => {
  return applyDecorators(
    IsUrl(
      {},
      { message: i18nValidationMessage<I18nTypes>('validation.IS_URL') },
    ),
  );
};

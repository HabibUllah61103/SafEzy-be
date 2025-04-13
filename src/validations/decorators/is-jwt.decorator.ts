import { applyDecorators } from '@nestjs/common';
import { IsJWT } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';
import { I18nTypes } from 'src/messages/i18n';

export const IsJwtDecorator = () => {
  return applyDecorators(
    IsJWT({
      message: i18nValidationMessage<I18nTypes>('validation.IS_JWT'),
    }),
  );
};

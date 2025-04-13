import { applyDecorators } from '@nestjs/common';
import { IsUUID } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';
import { I18nTypes } from 'src/messages/i18n';

type UUIDVersion = '3' | '4' | '5';

export const IsUUIDDecorator = (version?: UUIDVersion) => {
  return applyDecorators(
    IsUUID(version, {
      message: i18nValidationMessage<I18nTypes>('validation.IS_UUID'),
    }),
  );
};

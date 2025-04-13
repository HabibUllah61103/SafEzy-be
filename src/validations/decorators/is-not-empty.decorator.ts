import { applyDecorators } from '@nestjs/common';
import { IsNotEmpty, ValidationOptions } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';
import { I18nTypes } from 'src/messages/i18n';

export const IsNotEmptyDecorator = (options?: ValidationOptions) => {
  return applyDecorators(
    IsNotEmpty({
      ...options,
      message:
        options?.message ||
        i18nValidationMessage<I18nTypes>('validation.IS_NOT_EMPTY'),
    }),
  );
};

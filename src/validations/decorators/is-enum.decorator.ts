import { applyDecorators } from '@nestjs/common';
import { IsEnum, ValidationOptions } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';
import { I18nTypes } from 'src/messages/i18n';

export function IsEnumDecorator(enumType: any, options?: ValidationOptions) {
  return applyDecorators(
    IsEnum(enumType, {
      ...options,
      message:
        options?.message ||
        i18nValidationMessage<I18nTypes>('validation.IS_ENUM'),
    }),
  );
}

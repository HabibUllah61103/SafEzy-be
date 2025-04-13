import { registerDecorator, ValidationOptions } from 'class-validator';
import { isTdpOrCrnValidator } from '../custom';
import { applyDecorators } from '@nestjs/common';
import { i18nValidationMessage } from 'nestjs-i18n';
import { I18nTypes } from 'src/messages/i18n';

// Decorator
const isTdpOrCrn = (validationOptions?: ValidationOptions) => {
  return function (object: NonNullable<unknown>, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: isTdpOrCrnValidator,
    });
  };
};

export const IsTdpOrCrnDecorator = () => {
  return applyDecorators(
    isTdpOrCrn({
      message: i18nValidationMessage<I18nTypes>('validation.IS_TDP_OR_CRN'),
    }),
  );
};

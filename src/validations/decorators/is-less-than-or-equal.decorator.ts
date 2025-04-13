import { applyDecorators } from '@nestjs/common';
import { ValidationOptions, registerDecorator } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';
import { I18nTypes } from 'src/messages/i18n';

import { IsLessThanOrEqualValidator } from '../custom';

const IsLessThanOrEqual = (
  property: string,
  validationOptions?: ValidationOptions,
) => {
  return (object: Record<string, any>, propertyName: string) => {
    registerDecorator({
      name: 'isLessThanOrEqual',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [property], // Pass the name of the target property
      validator: IsLessThanOrEqualValidator,
    });
  };
};

export const IsLessThanOrEqualDecorator = (property: string) => {
  return applyDecorators(
    IsLessThanOrEqual(property, {
      message: i18nValidationMessage<I18nTypes>('validation.IS_AFTER'),
    }),
  );
};

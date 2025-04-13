import { applyDecorators } from '@nestjs/common';
import { ValidationOptions, registerDecorator } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';
import { I18nTypes } from 'src/messages/i18n';

import { IsAfterValidator } from '../custom';

const IsAfter = (property: string, validationOptions?: ValidationOptions) => {
  return (object: Record<string, any>, propertyName: string) => {
    registerDecorator({
      name: 'isAfter',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [property], // Pass the name of the target property
      validator: IsAfterValidator,
    });
  };
};

export const IsAfterDecorator = (property: string) => {
  return applyDecorators(
    IsAfter(property, {
      message: i18nValidationMessage<I18nTypes>('validation.IS_AFTER'),
    }),
  );
};

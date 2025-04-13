import { applyDecorators } from '@nestjs/common';
import { Length } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';
import {
  MAX_NOTE_LENGTH,
  MAX_TEXT_LENGTH,
  MIN_TEXT_LENGTH,
} from 'src/constants';
import { I18nTypes } from 'src/messages/i18n';

interface LengthDecoratorParams {
  minLength?: number;
  maxLength?: number;
  fieldType?: 'text' | 'note';
}

export const LengthDecorator = ({
  minLength = MIN_TEXT_LENGTH,
  maxLength = MAX_TEXT_LENGTH,
  fieldType = 'text',
}: LengthDecoratorParams = {}) => {
  const maxLengthMap = {
    text: maxLength,
    note: MAX_NOTE_LENGTH,
  };

  return applyDecorators(
    Length(minLength, maxLengthMap[fieldType], {
      message: i18nValidationMessage<I18nTypes>('validation.LENGTH'),
    }),
  );
};

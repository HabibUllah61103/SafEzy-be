import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'isLessThanOrEqual', async: false })
export class IsLessThanOrEqualValidator
  implements ValidatorConstraintInterface
{
  validate(value: any, args: ValidationArguments) {
    const { object, constraints } = args;
    const targetPropertyName = constraints[0];

    const targetValue = object[targetPropertyName];
    const inputValue = value;

    if (!targetValue || !inputValue) {
      return true;
    }

    return inputValue <= targetValue;
  }

  defaultMessage(args: ValidationArguments) {
    const { constraints } = args;
    const targetPropertyName = constraints[0];

    return `${args.property} must be less than or equal to ${targetPropertyName}`;
  }
}

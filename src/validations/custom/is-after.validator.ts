import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'isAfter', async: false })
export class IsAfterValidator implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    const { object, constraints } = args;
    const targetPropertyName = constraints[0];

    const targetDate = object[targetPropertyName];
    const inputDate = value;

    if (!targetDate || !inputDate) {
      return true;
    }

    return inputDate >= targetDate;
  }

  defaultMessage(args: ValidationArguments) {
    const { constraints } = args;
    const targetPropertyName = constraints[0];

    return `${args.property} must be after ${targetPropertyName}`;
  }
}

import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

// Validator Constratint for CRN OR TDP
@ValidatorConstraint({ name: 'isTdpOrCrn', async: false })
export class isTdpOrCrnValidator implements ValidatorConstraintInterface {
  validate(value: string): boolean {
    if (!value) return false;

    // CRN Validation (Example: UK CRN - 8 digits or SC123456 format)
    const crnRegex = /^[0-9]{8}$|^[A-Za-z]{2}[0-9]{6}$/;

    // TDP Validation (Example: Alphanumeric, 10 characters)
    const tdpRegex = /^[A-Za-z0-9]{10}$/;

    return crnRegex.test(value) || tdpRegex.test(value);
  }

  defaultMessage(args?: ValidationArguments): string {
    return `${args.property} must be a valide CRN (e.g., 12345678 or SC123456) or TDP (10 alphanumeric characters).`;
  }
}

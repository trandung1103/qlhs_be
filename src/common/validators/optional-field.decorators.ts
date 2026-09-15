import { applyDecorators } from '@nestjs/common';
import { IsISO8601, Matches, ValidateIf } from 'class-validator';

const isBlank = (value: unknown) => value === undefined || value === null || value === '';

// Vietnamese mobile/landline numbers, e.g. 0912345678 or +84912345678.
const VN_PHONE_REGEX = /^(0|\+84)[0-9]{9,10}$/;

export function IsOptionalPhone() {
  return applyDecorators(
    ValidateIf((o, value) => !isBlank(value)),
    Matches(VN_PHONE_REGEX, { message: 'Invalid Vietnamese phone number' }),
  );
}

export function IsOptionalDateString() {
  return applyDecorators(
    ValidateIf((o, value) => !isBlank(value)),
    IsISO8601({}, { message: 'Invalid date' }),
  );
}

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsOptionalPhone = IsOptionalPhone;
exports.IsOptionalDateString = IsOptionalDateString;
const common_1 = require("@nestjs/common");
const class_validator_1 = require("class-validator");
const isBlank = (value) => value === undefined || value === null || value === '';
const VN_PHONE_REGEX = /^(0|\+84)[0-9]{9,10}$/;
function IsOptionalPhone() {
    return (0, common_1.applyDecorators)((0, class_validator_1.ValidateIf)((o, value) => !isBlank(value)), (0, class_validator_1.Matches)(VN_PHONE_REGEX, { message: 'Invalid Vietnamese phone number' }));
}
function IsOptionalDateString() {
    return (0, common_1.applyDecorators)((0, class_validator_1.ValidateIf)((o, value) => !isBlank(value)), (0, class_validator_1.IsISO8601)({}, { message: 'Invalid date' }));
}
//# sourceMappingURL=optional-field.decorators.js.map
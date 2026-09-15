import { Gender, StudentStatus } from '@prisma/client';
import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import {
  IsOptionalDateString,
  IsOptionalPhone,
} from '../../common/validators/optional-field.decorators';

export class CreateStudentDto {
  @IsString()
  @IsNotEmpty()
  schoolYearId: string;

  @IsString()
  @IsNotEmpty()
  classId: string;

  // Name
  @IsOptional()
  @IsString()
  fullName?: string;

  @IsOptional()
  @IsString()
  familyAndMiddleName?: string;

  @IsOptional()
  @IsString()
  firstName?: string;

  @IsOptionalDateString()
  dateOfBirth?: string;

  @IsOptional()
  @IsEnum(Gender)
  gender?: Gender;

  @IsOptional()
  @IsString()
  identifier?: string;

  @IsOptional()
  @IsString()
  ethnicity?: string;

  @IsOptional()
  @IsString()
  nationality?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptionalPhone()
  studentPhone?: string;

  // Academic
  @IsOptional()
  @IsString()
  previousSchool?: string;

  @IsOptional()
  @IsEnum(StudentStatus)
  status?: StudentStatus;

  // Father
  @IsOptional()
  @IsString()
  fatherName?: string;

  @IsOptionalPhone()
  fatherPhone?: string;

  @IsOptional()
  @IsString()
  fatherJob?: string;

  @IsOptional()
  @IsString()
  fatherWorkplace?: string;

  // Mother
  @IsOptional()
  @IsString()
  motherName?: string;

  @IsOptionalPhone()
  motherPhone?: string;

  @IsOptional()
  @IsString()
  motherJob?: string;

  @IsOptional()
  @IsString()
  motherWorkplace?: string;

  // Health insurance
  @IsOptional()
  @IsBoolean()
  hasHealthInsurance?: boolean;

  @IsOptional()
  @IsString()
  healthInsuranceNumber?: string;

  @IsOptionalDateString()
  healthInsuranceStartDate?: string;

  @IsOptionalDateString()
  healthInsuranceEndDate?: string;

  @IsOptional()
  @IsString()
  healthInsuranceRegisteredHospital?: string;

  // Emergency contact
  @IsOptional()
  @IsString()
  emergencyContactName?: string;

  @IsOptional()
  @IsString()
  emergencyContactRelationship?: string;

  @IsOptionalPhone()
  emergencyContactPhone?: string;

  // Policy
  @IsOptional()
  @IsString()
  policyCategory?: string;

  // Health
  @IsOptional()
  @IsString()
  bloodType?: string;

  @IsOptional()
  @IsString()
  allergy?: string;

  @IsOptional()
  @IsString()
  healthNotes?: string;

  // Other
  @IsOptional()
  @IsString()
  notes?: string;

  // Custom field values, keyed by FieldDefinition id.
  // CHECKBOX (multi-select) fields use a string array; every other type uses a single string.
  @IsOptional()
  customFields?: Record<string, string | string[]>;
}

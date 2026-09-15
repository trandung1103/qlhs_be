import { Prisma } from '@prisma/client';

// Whitelist mapping between API sort identifiers and Prisma orderBy expressions.
// Never interpolate a raw client-supplied string into an ORDER BY clause.
export const STUDENT_SORTABLE_FIELDS: Record<
  string,
  (order: 'asc' | 'desc') => Prisma.StudentOrderByWithRelationInput | Prisma.StudentOrderByWithRelationInput[]
> = {
  fullName: (order) => [{ familyAndMiddleName: order }, { firstName: order }],
  className: (order) => ({ class: { name: order } }),
  dateOfBirth: (order) => ({ dateOfBirth: order }),
  gender: (order) => ({ gender: order }),
  identifier: (order) => ({ identifier: order }),
  ethnicity: (order) => ({ ethnicity: order }),
  nationality: (order) => ({ nationality: order }),
  address: (order) => ({ address: order }),
  studentPhone: (order) => ({ studentPhone: order }),
  previousSchool: (order) => ({ previousSchool: order }),
  status: (order) => ({ status: order }),
  fatherName: (order) => ({ fatherName: order }),
  fatherPhone: (order) => ({ fatherPhone: order }),
  fatherJob: (order) => ({ fatherJob: order }),
  fatherWorkplace: (order) => ({ fatherWorkplace: order }),
  motherName: (order) => ({ motherName: order }),
  motherPhone: (order) => ({ motherPhone: order }),
  motherJob: (order) => ({ motherJob: order }),
  motherWorkplace: (order) => ({ motherWorkplace: order }),
  hasHealthInsurance: (order) => ({ hasHealthInsurance: order }),
  healthInsuranceNumber: (order) => ({ healthInsuranceNumber: order }),
  healthInsuranceStartDate: (order) => ({ healthInsuranceStartDate: order }),
  healthInsuranceEndDate: (order) => ({ healthInsuranceEndDate: order }),
  healthInsuranceRegisteredHospital: (order) => ({ healthInsuranceRegisteredHospital: order }),
  emergencyContactName: (order) => ({ emergencyContactName: order }),
  emergencyContactRelationship: (order) => ({ emergencyContactRelationship: order }),
  emergencyContactPhone: (order) => ({ emergencyContactPhone: order }),
  policyCategory: (order) => ({ policyCategory: order }),
  bloodType: (order) => ({ bloodType: order }),
  allergy: (order) => ({ allergy: order }),
  healthNotes: (order) => ({ healthNotes: order }),
  notes: (order) => ({ notes: order }),
  createdAt: (order) => ({ createdAt: order }),
  displayOrder: (order) => ({ displayOrder: order }),
};

// Default ordering when the client does not request an explicit sort:
// the teacher-defined manual order (see students.reorder), not creation time.
export const DEFAULT_STUDENT_SORT: Prisma.StudentOrderByWithRelationInput = {
  displayOrder: 'asc',
};

// Fields searched by the free-text `search` query parameter (case-insensitive).
export const STUDENT_SEARCHABLE_FIELDS: Array<keyof Prisma.StudentWhereInput> = [
  'fullName',
  'familyAndMiddleName',
  'firstName',
  'identifier',
  'fatherPhone',
  'motherPhone',
];

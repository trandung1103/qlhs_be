import { Prisma } from '@prisma/client';

// Whitelist mapping between API sort identifiers and Prisma orderBy expressions.
// Never interpolate a raw client-supplied string into an ORDER BY clause.
//
// Every entry ends with `{ id: 'asc' }` as a tiebreaker. Without one, rows
// that tie on the requested field (very common — most fields are optional
// and many rows share `null`) have no guaranteed order between repeated
// queries, so paginating through "all rows sorted by X" across several
// requests could return the same row twice, skip others, or otherwise come
// back in a different relative order each time.
export const STUDENT_SORTABLE_FIELDS: Record<
  string,
  (order: 'asc' | 'desc') => Prisma.StudentOrderByWithRelationInput[]
> = {
  fullName: (order) => [
    { familyAndMiddleName: order },
    { firstName: order },
    { id: 'asc' },
  ],
  className: (order) => [{ class: { name: order } }, { id: 'asc' }],
  dateOfBirth: (order) => [{ dateOfBirth: order }, { id: 'asc' }],
  gender: (order) => [{ gender: order }, { id: 'asc' }],
  identifier: (order) => [{ identifier: order }, { id: 'asc' }],
  ethnicity: (order) => [{ ethnicity: order }, { id: 'asc' }],
  nationality: (order) => [{ nationality: order }, { id: 'asc' }],
  address: (order) => [{ address: order }, { id: 'asc' }],
  studentPhone: (order) => [{ studentPhone: order }, { id: 'asc' }],
  previousSchool: (order) => [{ previousSchool: order }, { id: 'asc' }],
  status: (order) => [{ status: order }, { id: 'asc' }],
  fatherName: (order) => [{ fatherName: order }, { id: 'asc' }],
  fatherPhone: (order) => [{ fatherPhone: order }, { id: 'asc' }],
  fatherJob: (order) => [{ fatherJob: order }, { id: 'asc' }],
  fatherWorkplace: (order) => [{ fatherWorkplace: order }, { id: 'asc' }],
  motherName: (order) => [{ motherName: order }, { id: 'asc' }],
  motherPhone: (order) => [{ motherPhone: order }, { id: 'asc' }],
  motherJob: (order) => [{ motherJob: order }, { id: 'asc' }],
  motherWorkplace: (order) => [{ motherWorkplace: order }, { id: 'asc' }],
  hasHealthInsurance: (order) => [{ hasHealthInsurance: order }, { id: 'asc' }],
  healthInsuranceNumber: (order) => [
    { healthInsuranceNumber: order },
    { id: 'asc' },
  ],
  healthInsuranceStartDate: (order) => [
    { healthInsuranceStartDate: order },
    { id: 'asc' },
  ],
  healthInsuranceEndDate: (order) => [
    { healthInsuranceEndDate: order },
    { id: 'asc' },
  ],
  healthInsuranceRegisteredHospital: (order) => [
    { healthInsuranceRegisteredHospital: order },
    { id: 'asc' },
  ],
  emergencyContactName: (order) => [
    { emergencyContactName: order },
    { id: 'asc' },
  ],
  emergencyContactRelationship: (order) => [
    { emergencyContactRelationship: order },
    { id: 'asc' },
  ],
  emergencyContactPhone: (order) => [
    { emergencyContactPhone: order },
    { id: 'asc' },
  ],
  policyCategory: (order) => [{ policyCategory: order }, { id: 'asc' }],
  bloodType: (order) => [{ bloodType: order }, { id: 'asc' }],
  allergy: (order) => [{ allergy: order }, { id: 'asc' }],
  healthNotes: (order) => [{ healthNotes: order }, { id: 'asc' }],
  notes: (order) => [{ notes: order }, { id: 'asc' }],
  createdAt: (order) => [{ createdAt: order }, { id: 'asc' }],
  displayOrder: (order) => [{ displayOrder: order }, { id: 'asc' }],
};

// Default ordering when the client does not request an explicit sort:
// the teacher-defined manual order (see students.reorder), not creation time.
export const DEFAULT_STUDENT_SORT: Prisma.StudentOrderByWithRelationInput[] = [
  { displayOrder: 'asc' },
  { id: 'asc' },
];

// Fields searched by the free-text `search` query parameter (case-insensitive).
export const STUDENT_SEARCHABLE_FIELDS: Array<keyof Prisma.StudentWhereInput> =
  [
    'fullName',
    'familyAndMiddleName',
    'firstName',
    'identifier',
    'fatherPhone',
    'motherPhone',
  ];

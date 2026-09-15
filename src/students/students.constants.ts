import { Prisma } from '@prisma/client';

// Ties on the requested sort field fall back to the existing manual order
// (displayOrder) — a stable sort, like Excel/Sheets: sorting by a
// low-cardinality column (gender, status...) shouldn't scramble students who
// already tie on that column, it should just group them while preserving
// their current relative order. `id` is the final tiebreaker so the overall
// order is always fully deterministic — without it, rows that also tie on
// displayOrder would have no guaranteed order between repeated queries,
// which matters because the sort-persist flow pages through the full class
// in chunks of 200 to write the new displayOrder: unstable ordering could
// return the same row twice or skip others, scrambling the saved result.
const STABLE_TIEBREAK: Prisma.StudentOrderByWithRelationInput[] = [
  { displayOrder: 'asc' },
  { id: 'asc' },
];

// Whitelist mapping between API sort identifiers and Prisma orderBy expressions.
// Never interpolate a raw client-supplied string into an ORDER BY clause.
export const STUDENT_SORTABLE_FIELDS: Record<
  string,
  (order: 'asc' | 'desc') => Prisma.StudentOrderByWithRelationInput[]
> = {
  // Vietnamese class rosters are conventionally alphabetized by given name
  // ("tên", the last word) rather than family name, unlike Western surname
  // ordering — so firstName is the primary key here, familyAndMiddleName
  // only a secondary tiebreak for students who share a given name.
  fullName: (order) => [
    { firstName: order },
    { familyAndMiddleName: order },
    ...STABLE_TIEBREAK,
  ],
  className: (order) => [{ class: { name: order } }, ...STABLE_TIEBREAK],
  dateOfBirth: (order) => [{ dateOfBirth: order }, ...STABLE_TIEBREAK],
  gender: (order) => [{ gender: order }, ...STABLE_TIEBREAK],
  identifier: (order) => [{ identifier: order }, ...STABLE_TIEBREAK],
  ethnicity: (order) => [{ ethnicity: order }, ...STABLE_TIEBREAK],
  nationality: (order) => [{ nationality: order }, ...STABLE_TIEBREAK],
  address: (order) => [{ address: order }, ...STABLE_TIEBREAK],
  studentPhone: (order) => [{ studentPhone: order }, ...STABLE_TIEBREAK],
  previousSchool: (order) => [{ previousSchool: order }, ...STABLE_TIEBREAK],
  status: (order) => [{ status: order }, ...STABLE_TIEBREAK],
  fatherName: (order) => [{ fatherName: order }, ...STABLE_TIEBREAK],
  fatherPhone: (order) => [{ fatherPhone: order }, ...STABLE_TIEBREAK],
  fatherJob: (order) => [{ fatherJob: order }, ...STABLE_TIEBREAK],
  fatherWorkplace: (order) => [{ fatherWorkplace: order }, ...STABLE_TIEBREAK],
  motherName: (order) => [{ motherName: order }, ...STABLE_TIEBREAK],
  motherPhone: (order) => [{ motherPhone: order }, ...STABLE_TIEBREAK],
  motherJob: (order) => [{ motherJob: order }, ...STABLE_TIEBREAK],
  motherWorkplace: (order) => [{ motherWorkplace: order }, ...STABLE_TIEBREAK],
  hasHealthInsurance: (order) => [{ hasHealthInsurance: order }, ...STABLE_TIEBREAK],
  healthInsuranceNumber: (order) => [{ healthInsuranceNumber: order }, ...STABLE_TIEBREAK],
  healthInsuranceStartDate: (order) => [{ healthInsuranceStartDate: order }, ...STABLE_TIEBREAK],
  healthInsuranceEndDate: (order) => [{ healthInsuranceEndDate: order }, ...STABLE_TIEBREAK],
  healthInsuranceRegisteredHospital: (order) => [
    { healthInsuranceRegisteredHospital: order },
    ...STABLE_TIEBREAK,
  ],
  emergencyContactName: (order) => [{ emergencyContactName: order }, ...STABLE_TIEBREAK],
  emergencyContactRelationship: (order) => [
    { emergencyContactRelationship: order },
    ...STABLE_TIEBREAK,
  ],
  emergencyContactPhone: (order) => [{ emergencyContactPhone: order }, ...STABLE_TIEBREAK],
  policyCategory: (order) => [{ policyCategory: order }, ...STABLE_TIEBREAK],
  bloodType: (order) => [{ bloodType: order }, ...STABLE_TIEBREAK],
  allergy: (order) => [{ allergy: order }, ...STABLE_TIEBREAK],
  healthNotes: (order) => [{ healthNotes: order }, ...STABLE_TIEBREAK],
  notes: (order) => [{ notes: order }, ...STABLE_TIEBREAK],
  createdAt: (order) => [{ createdAt: order }, ...STABLE_TIEBREAK],
  displayOrder: (order) => [{ displayOrder: order }, { id: 'asc' }],
};

// Default ordering when the client does not request an explicit sort:
// the teacher-defined manual order (see students.reorder), not creation time.
export const DEFAULT_STUDENT_SORT: Prisma.StudentOrderByWithRelationInput[] = [
  { displayOrder: 'asc' },
  { id: 'asc' },
];

// Fields searched by the free-text `search` query parameter (case-insensitive).
export const STUDENT_SEARCHABLE_FIELDS: Array<keyof Prisma.StudentWhereInput> = [
  'fullName',
  'familyAndMiddleName',
  'firstName',
  'identifier',
  'fatherPhone',
  'motherPhone',
];

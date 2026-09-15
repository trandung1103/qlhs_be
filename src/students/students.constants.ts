import { Prisma } from '@prisma/client';

// Ties on the requested sort field fall back to alphabetical-by-name (the
// order a person would expect, e.g. all "Nam" students still listed
// A-Z by name) rather than an arbitrary/creation-time order, then finally to
// `id` so the overall order is always fully deterministic — without that
// last tiebreaker, rows that also tie on name would have no guaranteed
// order between repeated queries, which matters because the sort-persist
// flow pages through the full class in chunks of 200 to write the new
// displayOrder: unstable ordering could return the same row twice or skip
// others, scrambling the saved result.
const NAME_TIEBREAK: Prisma.StudentOrderByWithRelationInput[] = [
  { familyAndMiddleName: 'asc' },
  { firstName: 'asc' },
  { id: 'asc' },
];

// Whitelist mapping between API sort identifiers and Prisma orderBy expressions.
// Never interpolate a raw client-supplied string into an ORDER BY clause.
export const STUDENT_SORTABLE_FIELDS: Record<
  string,
  (order: 'asc' | 'desc') => Prisma.StudentOrderByWithRelationInput[]
> = {
  fullName: (order) => [{ familyAndMiddleName: order }, { firstName: order }, { id: 'asc' }],
  className: (order) => [{ class: { name: order } }, ...NAME_TIEBREAK],
  dateOfBirth: (order) => [{ dateOfBirth: order }, ...NAME_TIEBREAK],
  gender: (order) => [{ gender: order }, ...NAME_TIEBREAK],
  identifier: (order) => [{ identifier: order }, ...NAME_TIEBREAK],
  ethnicity: (order) => [{ ethnicity: order }, ...NAME_TIEBREAK],
  nationality: (order) => [{ nationality: order }, ...NAME_TIEBREAK],
  address: (order) => [{ address: order }, ...NAME_TIEBREAK],
  studentPhone: (order) => [{ studentPhone: order }, ...NAME_TIEBREAK],
  previousSchool: (order) => [{ previousSchool: order }, ...NAME_TIEBREAK],
  status: (order) => [{ status: order }, ...NAME_TIEBREAK],
  fatherName: (order) => [{ fatherName: order }, ...NAME_TIEBREAK],
  fatherPhone: (order) => [{ fatherPhone: order }, ...NAME_TIEBREAK],
  fatherJob: (order) => [{ fatherJob: order }, ...NAME_TIEBREAK],
  fatherWorkplace: (order) => [{ fatherWorkplace: order }, ...NAME_TIEBREAK],
  motherName: (order) => [{ motherName: order }, ...NAME_TIEBREAK],
  motherPhone: (order) => [{ motherPhone: order }, ...NAME_TIEBREAK],
  motherJob: (order) => [{ motherJob: order }, ...NAME_TIEBREAK],
  motherWorkplace: (order) => [{ motherWorkplace: order }, ...NAME_TIEBREAK],
  hasHealthInsurance: (order) => [{ hasHealthInsurance: order }, ...NAME_TIEBREAK],
  healthInsuranceNumber: (order) => [{ healthInsuranceNumber: order }, ...NAME_TIEBREAK],
  healthInsuranceStartDate: (order) => [{ healthInsuranceStartDate: order }, ...NAME_TIEBREAK],
  healthInsuranceEndDate: (order) => [{ healthInsuranceEndDate: order }, ...NAME_TIEBREAK],
  healthInsuranceRegisteredHospital: (order) => [
    { healthInsuranceRegisteredHospital: order },
    ...NAME_TIEBREAK,
  ],
  emergencyContactName: (order) => [{ emergencyContactName: order }, ...NAME_TIEBREAK],
  emergencyContactRelationship: (order) => [{ emergencyContactRelationship: order }, ...NAME_TIEBREAK],
  emergencyContactPhone: (order) => [{ emergencyContactPhone: order }, ...NAME_TIEBREAK],
  policyCategory: (order) => [{ policyCategory: order }, ...NAME_TIEBREAK],
  bloodType: (order) => [{ bloodType: order }, ...NAME_TIEBREAK],
  allergy: (order) => [{ allergy: order }, ...NAME_TIEBREAK],
  healthNotes: (order) => [{ healthNotes: order }, ...NAME_TIEBREAK],
  notes: (order) => [{ notes: order }, ...NAME_TIEBREAK],
  createdAt: (order) => [{ createdAt: order }, ...NAME_TIEBREAK],
  displayOrder: (order) => [{ displayOrder: order }, ...NAME_TIEBREAK],
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

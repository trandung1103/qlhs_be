"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.STUDENT_SEARCHABLE_FIELDS = exports.DEFAULT_STUDENT_SORT = exports.STUDENT_SORTABLE_FIELDS = void 0;
exports.STUDENT_SORTABLE_FIELDS = {
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
exports.DEFAULT_STUDENT_SORT = {
    displayOrder: 'asc',
};
exports.STUDENT_SEARCHABLE_FIELDS = [
    'fullName',
    'familyAndMiddleName',
    'firstName',
    'identifier',
    'fatherPhone',
    'motherPhone',
];
//# sourceMappingURL=students.constants.js.map
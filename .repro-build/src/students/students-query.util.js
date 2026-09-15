"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildStudentWhere = buildStudentWhere;
const students_constants_1 = require("./students.constants");
function buildStudentWhere(params) {
    const where = {
        schoolYearId: params.schoolYearId,
    };
    if (params.classId) {
        where.classId = params.classId;
    }
    if (params.gender) {
        where.gender = params.gender;
    }
    if (params.status) {
        where.status = params.status;
    }
    if (params.hasHealthInsurance !== undefined) {
        where.hasHealthInsurance = params.hasHealthInsurance;
    }
    if (params.search) {
        where.OR = students_constants_1.STUDENT_SEARCHABLE_FIELDS.map((field) => ({
            [field]: { contains: params.search, mode: 'insensitive' },
        }));
    }
    return where;
}
//# sourceMappingURL=students-query.util.js.map
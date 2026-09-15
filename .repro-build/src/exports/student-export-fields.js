"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CUSTOM_FIELD_PREFIX = exports.STUDENT_EXPORT_FIELDS = void 0;
const health_insurance_status_1 = require("../common/utils/health-insurance-status");
const formatDate = (value) => value ? new Date(value).toLocaleDateString('vi-VN') : '';
const GENDER_LABELS = {
    MALE: 'Nam',
    FEMALE: 'Nữ',
    OTHER: 'Khác',
};
const STATUS_LABELS = {
    STUDYING: 'Đang học',
    TRANSFERRED: 'Chuyển trường',
    DROPPED_OUT: 'Nghỉ học',
    ON_LEAVE: 'Bảo lưu',
    COMPLETED: 'Hoàn thành năm học',
};
exports.STUDENT_EXPORT_FIELDS = {
    fullName: { header: 'Họ và tên', getValue: (s) => s.fullName ?? '' },
    familyAndMiddleName: { header: 'Họ và đệm', getValue: (s) => s.familyAndMiddleName ?? '' },
    firstName: { header: 'Tên', getValue: (s) => s.firstName ?? '' },
    dateOfBirth: { header: 'Ngày sinh', getValue: (s) => formatDate(s.dateOfBirth) },
    gender: { header: 'Giới tính', getValue: (s) => (s.gender ? GENDER_LABELS[s.gender] : '') },
    identifier: { header: 'Mã định danh cá nhân', getValue: (s) => s.identifier ?? '' },
    ethnicity: { header: 'Dân tộc', getValue: (s) => s.ethnicity ?? '' },
    nationality: { header: 'Quốc tịch', getValue: (s) => s.nationality ?? '' },
    address: { header: 'Địa chỉ', getValue: (s) => s.address ?? '' },
    studentPhone: { header: 'Số điện thoại học sinh', getValue: (s) => s.studentPhone ?? '' },
    className: { header: 'Lớp', getValue: (s) => s.class?.name ?? '' },
    previousSchool: { header: 'Trường cũ', getValue: (s) => s.previousSchool ?? '' },
    status: { header: 'Tình trạng học sinh', getValue: (s) => (s.status ? STATUS_LABELS[s.status] : '') },
    fatherName: { header: 'Họ tên bố', getValue: (s) => s.fatherName ?? '' },
    fatherPhone: { header: 'Số điện thoại bố', getValue: (s) => s.fatherPhone ?? '' },
    fatherJob: { header: 'Nghề nghiệp bố', getValue: (s) => s.fatherJob ?? '' },
    fatherWorkplace: { header: 'Nơi công tác bố', getValue: (s) => s.fatherWorkplace ?? '' },
    motherName: { header: 'Họ tên mẹ', getValue: (s) => s.motherName ?? '' },
    motherPhone: { header: 'Số điện thoại mẹ', getValue: (s) => s.motherPhone ?? '' },
    motherJob: { header: 'Nghề nghiệp mẹ', getValue: (s) => s.motherJob ?? '' },
    motherWorkplace: { header: 'Nơi công tác mẹ', getValue: (s) => s.motherWorkplace ?? '' },
    hasHealthInsurance: {
        header: 'Có BHYT',
        getValue: (s) => (s.hasHealthInsurance == null ? '' : s.hasHealthInsurance ? 'Có' : 'Không'),
    },
    healthInsuranceNumber: { header: 'Số thẻ BHYT', getValue: (s) => s.healthInsuranceNumber ?? '' },
    healthInsuranceStartDate: {
        header: 'Ngày bắt đầu BHYT',
        getValue: (s) => formatDate(s.healthInsuranceStartDate),
    },
    healthInsuranceEndDate: {
        header: 'Ngày hết hạn BHYT',
        getValue: (s) => formatDate(s.healthInsuranceEndDate),
    },
    healthInsuranceStatus: {
        header: 'Tình trạng BHYT',
        getValue: (s) => (0, health_insurance_status_1.getHealthInsuranceStatus)(s.hasHealthInsurance, s.healthInsuranceEndDate),
    },
    healthInsuranceRegisteredHospital: {
        header: 'Nơi đăng ký khám chữa bệnh',
        getValue: (s) => s.healthInsuranceRegisteredHospital ?? '',
    },
    emergencyContactName: {
        header: 'Họ tên người liên hệ khẩn cấp',
        getValue: (s) => s.emergencyContactName ?? '',
    },
    emergencyContactRelationship: {
        header: 'Quan hệ với học sinh',
        getValue: (s) => s.emergencyContactRelationship ?? '',
    },
    emergencyContactPhone: {
        header: 'Số điện thoại liên hệ khẩn cấp',
        getValue: (s) => s.emergencyContactPhone ?? '',
    },
    policyCategory: { header: 'Đối tượng chính sách', getValue: (s) => s.policyCategory ?? '' },
    bloodType: { header: 'Nhóm máu', getValue: (s) => s.bloodType ?? '' },
    allergy: { header: 'Dị ứng', getValue: (s) => s.allergy ?? '' },
    healthNotes: { header: 'Ghi chú sức khỏe', getValue: (s) => s.healthNotes ?? '' },
    notes: { header: 'Ghi chú', getValue: (s) => s.notes ?? '' },
};
exports.CUSTOM_FIELD_PREFIX = 'customField:';
//# sourceMappingURL=student-export-fields.js.map
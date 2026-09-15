export type HealthInsuranceStatus = 'Chưa có' | 'Còn hạn' | 'Sắp hết hạn' | 'Đã hết hạn';
export declare function getHealthInsuranceStatus(hasHealthInsurance: boolean | null | undefined, endDate: Date | null | undefined): HealthInsuranceStatus;

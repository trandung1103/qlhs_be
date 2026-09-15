export type HealthInsuranceStatus = 'Chưa có' | 'Còn hạn' | 'Sắp hết hạn' | 'Đã hết hạn';

const EXPIRING_SOON_THRESHOLD_DAYS = 30;

export function getHealthInsuranceStatus(
  hasHealthInsurance: boolean | null | undefined,
  endDate: Date | null | undefined,
): HealthInsuranceStatus {
  if (!hasHealthInsurance || !endDate) {
    return 'Chưa có';
  }

  const today = new Date();
  const msPerDay = 1000 * 60 * 60 * 24;
  const daysUntilExpiry = Math.ceil((endDate.getTime() - today.getTime()) / msPerDay);

  if (daysUntilExpiry < 0) {
    return 'Đã hết hạn';
  }
  if (daysUntilExpiry <= EXPIRING_SOON_THRESHOLD_DAYS) {
    return 'Sắp hết hạn';
  }
  return 'Còn hạn';
}

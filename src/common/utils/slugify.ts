// Converts a Vietnamese display name into a stable, machine-friendly snake_case key.
// e.g. "Hoàn cảnh gia đình" -> "hoan_canh_gia_dinh"
export function slugifyToKey(input: string): string {
  const withoutDiacritics = input
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/đ/gi, 'd');

  return withoutDiacritics
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s_]/g, '')
    .replace(/\s+/g, '_')
    .replace(/_+/g, '_')
    .replace(/^_|_$/g, '');
}

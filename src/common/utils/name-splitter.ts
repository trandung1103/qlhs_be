export interface SplitName {
  fullName: string;
  familyAndMiddleName: string;
  firstName: string;
}

export function normalizeFullName(rawName: string): string {
  return rawName.trim().replace(/\s+/g, ' ');
}

export function splitFullName(rawName: string): SplitName {
  const fullName = normalizeFullName(rawName ?? '');

  if (!fullName) {
    return { fullName: '', familyAndMiddleName: '', firstName: '' };
  }

  const parts = fullName.split(' ');
  const firstName = parts[parts.length - 1];
  const familyAndMiddleName = parts.slice(0, -1).join(' ');

  return { fullName, familyAndMiddleName, firstName };
}

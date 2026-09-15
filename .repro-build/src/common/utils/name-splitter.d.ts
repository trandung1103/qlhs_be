export interface SplitName {
    fullName: string;
    familyAndMiddleName: string;
    firstName: string;
}
export declare function normalizeFullName(rawName: string): string;
export declare function splitFullName(rawName: string): SplitName;

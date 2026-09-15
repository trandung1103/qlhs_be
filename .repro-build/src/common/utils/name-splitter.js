"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizeFullName = normalizeFullName;
exports.splitFullName = splitFullName;
function normalizeFullName(rawName) {
    return rawName.trim().replace(/\s+/g, ' ');
}
function splitFullName(rawName) {
    const fullName = normalizeFullName(rawName ?? '');
    if (!fullName) {
        return { fullName: '', familyAndMiddleName: '', firstName: '' };
    }
    const parts = fullName.split(' ');
    const firstName = parts[parts.length - 1];
    const familyAndMiddleName = parts.slice(0, -1).join(' ');
    return { fullName, familyAndMiddleName, firstName };
}
//# sourceMappingURL=name-splitter.js.map
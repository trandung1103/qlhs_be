"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.slugifyToKey = slugifyToKey;
function slugifyToKey(input) {
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
//# sourceMappingURL=slugify.js.map
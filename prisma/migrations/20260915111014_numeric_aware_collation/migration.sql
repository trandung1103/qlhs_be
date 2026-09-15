-- Register a numeric-aware Vietnamese ICU collation (the `kn-true` Unicode
-- extension makes digit runs compare by numeric value), then move the same
-- columns that already use the plain Vietnamese collation onto it — so e.g.
-- "Khối 2" sorts before "Khối 10" instead of after it (plain collation
-- compares "10" and "2" character-by-character, so "1" < "2" puts "10"
-- first).
CREATE COLLATION IF NOT EXISTS "vi-VN-u-kn-true-x-icu" (provider = icu, locale = 'vi-VN-u-kn-true');

ALTER TABLE "students" ALTER COLUMN "fullName" TYPE text COLLATE "vi-VN-u-kn-true-x-icu";
ALTER TABLE "students" ALTER COLUMN "familyAndMiddleName" TYPE text COLLATE "vi-VN-u-kn-true-x-icu";
ALTER TABLE "students" ALTER COLUMN "firstName" TYPE text COLLATE "vi-VN-u-kn-true-x-icu";
ALTER TABLE "students" ALTER COLUMN "address" TYPE text COLLATE "vi-VN-u-kn-true-x-icu";

ALTER TABLE "classes" ALTER COLUMN "name" TYPE text COLLATE "vi-VN-u-kn-true-x-icu";

-- Apply Vietnamese-aware ICU collation so ORDER BY on these text columns
-- sorts correctly by Vietnamese alphabetical order (including diacritics),
-- transparently for every Prisma query (no per-query raw SQL needed).

ALTER TABLE "students" ALTER COLUMN "fullName" TYPE text COLLATE "vi-VN-x-icu";
ALTER TABLE "students" ALTER COLUMN "familyAndMiddleName" TYPE text COLLATE "vi-VN-x-icu";
ALTER TABLE "students" ALTER COLUMN "firstName" TYPE text COLLATE "vi-VN-x-icu";
ALTER TABLE "students" ALTER COLUMN "address" TYPE text COLLATE "vi-VN-x-icu";

ALTER TABLE "classes" ALTER COLUMN "name" TYPE text COLLATE "vi-VN-x-icu";

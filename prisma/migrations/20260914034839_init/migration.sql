-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE', 'OTHER');

-- CreateEnum
CREATE TYPE "StudentStatus" AS ENUM ('STUDYING', 'TRANSFERRED', 'DROPPED_OUT', 'ON_LEAVE', 'COMPLETED');

-- CreateEnum
CREATE TYPE "FieldType" AS ENUM ('TEXT', 'TEXTAREA', 'NUMBER', 'DATE', 'SELECT', 'RADIO', 'CHECKBOX');

-- CreateTable
CREATE TABLE "school_years" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "startYear" INTEGER NOT NULL,
    "endYear" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "school_years_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "classes" (
    "id" TEXT NOT NULL,
    "schoolYearId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "classes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "students" (
    "id" TEXT NOT NULL,
    "schoolYearId" TEXT NOT NULL,
    "classId" TEXT NOT NULL,
    "fullName" TEXT,
    "familyAndMiddleName" TEXT,
    "firstName" TEXT,
    "dateOfBirth" TIMESTAMP(3),
    "gender" "Gender",
    "identifier" TEXT,
    "ethnicity" TEXT,
    "nationality" TEXT,
    "address" TEXT,
    "studentPhone" TEXT,
    "previousSchool" TEXT,
    "status" "StudentStatus",
    "fatherName" TEXT,
    "fatherPhone" TEXT,
    "fatherJob" TEXT,
    "fatherWorkplace" TEXT,
    "motherName" TEXT,
    "motherPhone" TEXT,
    "motherJob" TEXT,
    "motherWorkplace" TEXT,
    "hasHealthInsurance" BOOLEAN,
    "healthInsuranceNumber" TEXT,
    "healthInsuranceStartDate" TIMESTAMP(3),
    "healthInsuranceEndDate" TIMESTAMP(3),
    "healthInsuranceRegisteredHospital" TEXT,
    "emergencyContactName" TEXT,
    "emergencyContactRelationship" TEXT,
    "emergencyContactPhone" TEXT,
    "policyCategory" TEXT,
    "bloodType" TEXT,
    "allergy" TEXT,
    "healthNotes" TEXT,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "students_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "field_definitions" (
    "id" TEXT NOT NULL,
    "schoolYearId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "type" "FieldType" NOT NULL,
    "isSystem" BOOLEAN NOT NULL DEFAULT false,
    "isRequired" BOOLEAN NOT NULL DEFAULT false,
    "isVisible" BOOLEAN NOT NULL DEFAULT true,
    "isSearchable" BOOLEAN NOT NULL DEFAULT false,
    "isSortable" BOOLEAN NOT NULL DEFAULT false,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "displayOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "field_definitions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "field_options" (
    "id" TEXT NOT NULL,
    "fieldDefinitionId" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "displayOrder" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "field_options_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "student_field_values" (
    "id" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "fieldDefinitionId" TEXT NOT NULL,
    "value" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "student_field_values_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "school_years_name_key" ON "school_years"("name");

-- CreateIndex
CREATE INDEX "classes_schoolYearId_idx" ON "classes"("schoolYearId");

-- CreateIndex
CREATE UNIQUE INDEX "classes_schoolYearId_name_key" ON "classes"("schoolYearId", "name");

-- CreateIndex
CREATE INDEX "students_schoolYearId_idx" ON "students"("schoolYearId");

-- CreateIndex
CREATE INDEX "students_classId_idx" ON "students"("classId");

-- CreateIndex
CREATE INDEX "field_definitions_schoolYearId_idx" ON "field_definitions"("schoolYearId");

-- CreateIndex
CREATE UNIQUE INDEX "field_definitions_schoolYearId_key_key" ON "field_definitions"("schoolYearId", "key");

-- CreateIndex
CREATE INDEX "field_options_fieldDefinitionId_idx" ON "field_options"("fieldDefinitionId");

-- CreateIndex
CREATE INDEX "student_field_values_studentId_idx" ON "student_field_values"("studentId");

-- CreateIndex
CREATE INDEX "student_field_values_fieldDefinitionId_idx" ON "student_field_values"("fieldDefinitionId");

-- AddForeignKey
ALTER TABLE "classes" ADD CONSTRAINT "classes_schoolYearId_fkey" FOREIGN KEY ("schoolYearId") REFERENCES "school_years"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "students" ADD CONSTRAINT "students_schoolYearId_fkey" FOREIGN KEY ("schoolYearId") REFERENCES "school_years"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "students" ADD CONSTRAINT "students_classId_fkey" FOREIGN KEY ("classId") REFERENCES "classes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "field_definitions" ADD CONSTRAINT "field_definitions_schoolYearId_fkey" FOREIGN KEY ("schoolYearId") REFERENCES "school_years"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "field_options" ADD CONSTRAINT "field_options_fieldDefinitionId_fkey" FOREIGN KEY ("fieldDefinitionId") REFERENCES "field_definitions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "student_field_values" ADD CONSTRAINT "student_field_values_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "students"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "student_field_values" ADD CONSTRAINT "student_field_values_fieldDefinitionId_fkey" FOREIGN KEY ("fieldDefinitionId") REFERENCES "field_definitions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

import { CreateStudentDto } from './create-student.dto';
declare const UpdateStudentDto_base: import("@nestjs/mapped-types").MappedType<Partial<Omit<CreateStudentDto, "schoolYearId">>>;
export declare class UpdateStudentDto extends UpdateStudentDto_base {
}
export {};

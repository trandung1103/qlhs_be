"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchoolYearsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let SchoolYearsService = class SchoolYearsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    create(dto) {
        return this.prisma.schoolYear.create({ data: dto });
    }
    findAll() {
        return this.prisma.schoolYear.findMany({ orderBy: { startYear: 'desc' } });
    }
    async findOne(id) {
        const schoolYear = await this.prisma.schoolYear.findUnique({ where: { id } });
        if (!schoolYear) {
            throw new common_1.NotFoundException('School year not found');
        }
        return schoolYear;
    }
    async update(id, dto) {
        await this.findOne(id);
        return this.prisma.schoolYear.update({ where: { id }, data: dto });
    }
    async remove(id) {
        await this.findOne(id);
        const [classCount, studentCount] = await Promise.all([
            this.prisma.class.count({ where: { schoolYearId: id } }),
            this.prisma.student.count({ where: { schoolYearId: id } }),
        ]);
        if (classCount > 0 || studentCount > 0) {
            throw new common_1.ConflictException('Cannot delete a school year that still has classes or students. Delete them first.');
        }
        return this.prisma.schoolYear.delete({ where: { id } });
    }
};
exports.SchoolYearsService = SchoolYearsService;
exports.SchoolYearsService = SchoolYearsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], SchoolYearsService);
//# sourceMappingURL=school-years.service.js.map
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
exports.ClassesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let ClassesService = class ClassesService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(dto) {
        const schoolYear = await this.prisma.schoolYear.findUnique({
            where: { id: dto.schoolYearId },
        });
        if (!schoolYear) {
            throw new common_1.NotFoundException('School year not found');
        }
        return this.prisma.class.create({
            data: { schoolYearId: dto.schoolYearId, name: dto.name },
        });
    }
    findAll(schoolYearId) {
        return this.prisma.class.findMany({
            where: { schoolYearId },
            orderBy: { name: 'asc' },
        });
    }
    async findOne(id) {
        const cls = await this.prisma.class.findUnique({ where: { id } });
        if (!cls) {
            throw new common_1.NotFoundException('Class not found');
        }
        return cls;
    }
    async update(id, dto) {
        await this.findOne(id);
        return this.prisma.class.update({ where: { id }, data: dto });
    }
    async remove(id) {
        await this.findOne(id);
        const studentCount = await this.prisma.student.count({ where: { classId: id } });
        if (studentCount > 0) {
            throw new common_1.ConflictException('Cannot delete a class that still has students. Delete or move them first.');
        }
        return this.prisma.class.delete({ where: { id } });
    }
};
exports.ClassesService = ClassesService;
exports.ClassesService = ClassesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ClassesService);
//# sourceMappingURL=classes.service.js.map
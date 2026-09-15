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
exports.FieldDefinitionsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const slugify_1 = require("../common/utils/slugify");
let FieldDefinitionsService = class FieldDefinitionsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async generateUniqueKey(schoolYearId, name) {
        const base = (0, slugify_1.slugifyToKey)(name) || 'field';
        let key = base;
        let suffix = 1;
        while (await this.prisma.fieldDefinition.findUnique({
            where: { schoolYearId_key: { schoolYearId, key } },
        })) {
            suffix += 1;
            key = `${base}_${suffix}`;
        }
        return key;
    }
    async create(dto) {
        const schoolYear = await this.prisma.schoolYear.findUnique({
            where: { id: dto.schoolYearId },
        });
        if (!schoolYear) {
            throw new common_1.BadRequestException('School year not found');
        }
        const key = await this.generateUniqueKey(dto.schoolYearId, dto.name);
        const lastField = await this.prisma.fieldDefinition.findFirst({
            where: { schoolYearId: dto.schoolYearId },
            orderBy: { displayOrder: 'desc' },
        });
        return this.prisma.fieldDefinition.create({
            data: {
                schoolYearId: dto.schoolYearId,
                name: dto.name,
                key,
                type: dto.type,
                isSystem: false,
                isRequired: dto.isRequired ?? false,
                isVisible: dto.isVisible ?? true,
                isSearchable: dto.isSearchable ?? false,
                isSortable: dto.isSortable ?? false,
                displayOrder: dto.displayOrder ?? (lastField?.displayOrder ?? 0) + 1,
            },
        });
    }
    findAll(schoolYearId) {
        return this.prisma.fieldDefinition.findMany({
            where: { schoolYearId },
            orderBy: { displayOrder: 'asc' },
            include: { options: { orderBy: { displayOrder: 'asc' } } },
        });
    }
    async findOne(id) {
        const field = await this.prisma.fieldDefinition.findUnique({
            where: { id },
            include: { options: { orderBy: { displayOrder: 'asc' } } },
        });
        if (!field) {
            throw new common_1.NotFoundException('Field definition not found');
        }
        return field;
    }
    async update(id, dto) {
        const existing = await this.findOne(id);
        if (existing.isSystem && dto.isActive === false) {
            throw new common_1.BadRequestException('System fields cannot be deactivated');
        }
        return this.prisma.fieldDefinition.update({ where: { id }, data: dto });
    }
    async remove(id) {
        const existing = await this.findOne(id);
        if (existing.isSystem) {
            throw new common_1.BadRequestException('System fields cannot be deleted');
        }
        const valueCount = await this.prisma.studentFieldValue.count({
            where: { fieldDefinitionId: id },
        });
        if (valueCount > 0) {
            throw new common_1.BadRequestException('This field already has student data. Deactivate it instead of deleting it.');
        }
        return this.prisma.fieldDefinition.delete({ where: { id } });
    }
};
exports.FieldDefinitionsService = FieldDefinitionsService;
exports.FieldDefinitionsService = FieldDefinitionsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], FieldDefinitionsService);
//# sourceMappingURL=field-definitions.service.js.map
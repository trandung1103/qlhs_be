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
exports.FieldOptionsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let FieldOptionsService = class FieldOptionsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async assertFieldExists(fieldDefinitionId) {
        const field = await this.prisma.fieldDefinition.findUnique({
            where: { id: fieldDefinitionId },
        });
        if (!field) {
            throw new common_1.NotFoundException('Field definition not found');
        }
        return field;
    }
    async create(fieldDefinitionId, dto) {
        await this.assertFieldExists(fieldDefinitionId);
        const lastOption = await this.prisma.fieldOption.findFirst({
            where: { fieldDefinitionId },
            orderBy: { displayOrder: 'desc' },
        });
        return this.prisma.fieldOption.create({
            data: {
                fieldDefinitionId,
                label: dto.label,
                value: dto.value,
                displayOrder: dto.displayOrder ?? (lastOption?.displayOrder ?? 0) + 1,
            },
        });
    }
    async findAll(fieldDefinitionId) {
        await this.assertFieldExists(fieldDefinitionId);
        return this.prisma.fieldOption.findMany({
            where: { fieldDefinitionId },
            orderBy: { displayOrder: 'asc' },
        });
    }
    async findOneOrThrow(fieldDefinitionId, optionId) {
        const option = await this.prisma.fieldOption.findFirst({
            where: { id: optionId, fieldDefinitionId },
        });
        if (!option) {
            throw new common_1.NotFoundException('Field option not found');
        }
        return option;
    }
    async update(fieldDefinitionId, optionId, dto) {
        await this.findOneOrThrow(fieldDefinitionId, optionId);
        return this.prisma.fieldOption.update({ where: { id: optionId }, data: dto });
    }
    async remove(fieldDefinitionId, optionId) {
        const option = await this.findOneOrThrow(fieldDefinitionId, optionId);
        const usageCount = await this.prisma.studentFieldValue.count({
            where: { fieldDefinitionId, value: option.value },
        });
        if (usageCount > 0) {
            return this.prisma.fieldOption.update({
                where: { id: optionId },
                data: { isActive: false },
            });
        }
        return this.prisma.fieldOption.delete({ where: { id: optionId } });
    }
};
exports.FieldOptionsService = FieldOptionsService;
exports.FieldOptionsService = FieldOptionsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], FieldOptionsService);
//# sourceMappingURL=field-options.service.js.map
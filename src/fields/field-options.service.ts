import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateFieldOptionDto } from './dto/create-field-option.dto';
import { UpdateFieldOptionDto } from './dto/update-field-option.dto';

@Injectable()
export class FieldOptionsService {
  constructor(private readonly prisma: PrismaService) {}

  private async assertFieldExists(fieldDefinitionId: string) {
    const field = await this.prisma.fieldDefinition.findUnique({
      where: { id: fieldDefinitionId },
    });
    if (!field) {
      throw new NotFoundException('Field definition not found');
    }
    return field;
  }

  async create(fieldDefinitionId: string, dto: CreateFieldOptionDto) {
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

  async findAll(fieldDefinitionId: string) {
    await this.assertFieldExists(fieldDefinitionId);
    return this.prisma.fieldOption.findMany({
      where: { fieldDefinitionId },
      orderBy: { displayOrder: 'asc' },
    });
  }

  private async findOneOrThrow(fieldDefinitionId: string, optionId: string) {
    const option = await this.prisma.fieldOption.findFirst({
      where: { id: optionId, fieldDefinitionId },
    });
    if (!option) {
      throw new NotFoundException('Field option not found');
    }
    return option;
  }

  async update(fieldDefinitionId: string, optionId: string, dto: UpdateFieldOptionDto) {
    await this.findOneOrThrow(fieldDefinitionId, optionId);
    return this.prisma.fieldOption.update({ where: { id: optionId }, data: dto });
  }

  async remove(fieldDefinitionId: string, optionId: string) {
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
}

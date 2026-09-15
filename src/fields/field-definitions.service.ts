import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateFieldDefinitionDto } from './dto/create-field-definition.dto';
import { UpdateFieldDefinitionDto } from './dto/update-field-definition.dto';
import { slugifyToKey } from '../common/utils/slugify';

@Injectable()
export class FieldDefinitionsService {
  constructor(private readonly prisma: PrismaService) {}

  private async generateUniqueKey(schoolYearId: string, name: string) {
    const base = slugifyToKey(name) || 'field';
    let key = base;
    let suffix = 1;

    while (
      await this.prisma.fieldDefinition.findUnique({
        where: { schoolYearId_key: { schoolYearId, key } },
      })
    ) {
      suffix += 1;
      key = `${base}_${suffix}`;
    }

    return key;
  }

  async create(dto: CreateFieldDefinitionDto) {
    const schoolYear = await this.prisma.schoolYear.findUnique({
      where: { id: dto.schoolYearId },
    });
    if (!schoolYear) {
      throw new BadRequestException('School year not found');
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

  findAll(schoolYearId: string) {
    return this.prisma.fieldDefinition.findMany({
      where: { schoolYearId },
      orderBy: { displayOrder: 'asc' },
      include: { options: { orderBy: { displayOrder: 'asc' } } },
    });
  }

  async findOne(id: string) {
    const field = await this.prisma.fieldDefinition.findUnique({
      where: { id },
      include: { options: { orderBy: { displayOrder: 'asc' } } },
    });
    if (!field) {
      throw new NotFoundException('Field definition not found');
    }
    return field;
  }

  async update(id: string, dto: UpdateFieldDefinitionDto) {
    const existing = await this.findOne(id);
    if (existing.isSystem && dto.isActive === false) {
      throw new BadRequestException('System fields cannot be deactivated');
    }
    return this.prisma.fieldDefinition.update({ where: { id }, data: dto });
  }

  async remove(id: string) {
    const existing = await this.findOne(id);
    if (existing.isSystem) {
      throw new BadRequestException('System fields cannot be deleted');
    }

    const valueCount = await this.prisma.studentFieldValue.count({
      where: { fieldDefinitionId: id },
    });
    if (valueCount > 0) {
      throw new BadRequestException(
        'This field already has student data. Deactivate it instead of deleting it.',
      );
    }

    return this.prisma.fieldDefinition.delete({ where: { id } });
  }
}

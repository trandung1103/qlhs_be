import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSchoolYearDto } from './dto/create-school-year.dto';
import { UpdateSchoolYearDto } from './dto/update-school-year.dto';

@Injectable()
export class SchoolYearsService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateSchoolYearDto) {
    return this.prisma.schoolYear.create({ data: dto });
  }

  findAll() {
    return this.prisma.schoolYear.findMany({ orderBy: { startYear: 'desc' } });
  }

  async findOne(id: string) {
    const schoolYear = await this.prisma.schoolYear.findUnique({ where: { id } });
    if (!schoolYear) {
      throw new NotFoundException('School year not found');
    }
    return schoolYear;
  }

  async update(id: string, dto: UpdateSchoolYearDto) {
    await this.findOne(id);
    return this.prisma.schoolYear.update({ where: { id }, data: dto });
  }

  async remove(id: string) {
    await this.findOne(id);

    const [classCount, studentCount] = await Promise.all([
      this.prisma.class.count({ where: { schoolYearId: id } }),
      this.prisma.student.count({ where: { schoolYearId: id } }),
    ]);

    if (classCount > 0 || studentCount > 0) {
      throw new ConflictException(
        'Cannot delete a school year that still has classes or students. Delete them first.',
      );
    }

    return this.prisma.schoolYear.delete({ where: { id } });
  }
}

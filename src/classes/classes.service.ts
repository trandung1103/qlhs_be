import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';

@Injectable()
export class ClassesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateClassDto) {
    const schoolYear = await this.prisma.schoolYear.findUnique({
      where: { id: dto.schoolYearId },
    });
    if (!schoolYear) {
      throw new NotFoundException('School year not found');
    }

    return this.prisma.class.create({
      data: { schoolYearId: dto.schoolYearId, name: dto.name },
    });
  }

  findAll(schoolYearId: string) {
    return this.prisma.class.findMany({
      where: { schoolYearId },
      orderBy: { name: 'asc' },
    });
  }

  async findOne(id: string) {
    const cls = await this.prisma.class.findUnique({ where: { id } });
    if (!cls) {
      throw new NotFoundException('Class not found');
    }
    return cls;
  }

  async update(id: string, dto: UpdateClassDto) {
    await this.findOne(id);
    return this.prisma.class.update({ where: { id }, data: dto });
  }

  async remove(id: string) {
    await this.findOne(id);

    const studentCount = await this.prisma.student.count({ where: { classId: id } });
    if (studentCount > 0) {
      throw new ConflictException(
        'Cannot delete a class that still has students. Delete or move them first.',
      );
    }

    return this.prisma.class.delete({ where: { id } });
  }
}

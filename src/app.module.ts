import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { SchoolYearsModule } from './school-years/school-years.module';
import { ClassesModule } from './classes/classes.module';
import { StudentsModule } from './students/students.module';
import { FieldsModule } from './fields/fields.module';
import { ExportsModule } from './exports/exports.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    SchoolYearsModule,
    ClassesModule,
    StudentsModule,
    FieldsModule,
    ExportsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

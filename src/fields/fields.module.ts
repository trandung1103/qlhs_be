import { Module } from '@nestjs/common';
import { FieldDefinitionsService } from './field-definitions.service';
import { FieldDefinitionsController } from './field-definitions.controller';
import { FieldOptionsService } from './field-options.service';
import { FieldOptionsController } from './field-options.controller';

@Module({
  controllers: [FieldDefinitionsController, FieldOptionsController],
  providers: [FieldDefinitionsService, FieldOptionsService],
  exports: [FieldDefinitionsService, FieldOptionsService],
})
export class FieldsModule {}

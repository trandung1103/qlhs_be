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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FieldDefinitionsController = void 0;
const common_1 = require("@nestjs/common");
const field_definitions_service_1 = require("./field-definitions.service");
const create_field_definition_dto_1 = require("./dto/create-field-definition.dto");
const update_field_definition_dto_1 = require("./dto/update-field-definition.dto");
const query_field_definitions_dto_1 = require("./dto/query-field-definitions.dto");
let FieldDefinitionsController = class FieldDefinitionsController {
    constructor(fieldDefinitionsService) {
        this.fieldDefinitionsService = fieldDefinitionsService;
    }
    create(dto) {
        return this.fieldDefinitionsService.create(dto);
    }
    findAll(query) {
        return this.fieldDefinitionsService.findAll(query.schoolYearId);
    }
    findOne(id) {
        return this.fieldDefinitionsService.findOne(id);
    }
    update(id, dto) {
        return this.fieldDefinitionsService.update(id, dto);
    }
    remove(id) {
        return this.fieldDefinitionsService.remove(id);
    }
};
exports.FieldDefinitionsController = FieldDefinitionsController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_field_definition_dto_1.CreateFieldDefinitionDto]),
    __metadata("design:returntype", void 0)
], FieldDefinitionsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_field_definitions_dto_1.QueryFieldDefinitionsDto]),
    __metadata("design:returntype", void 0)
], FieldDefinitionsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], FieldDefinitionsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_field_definition_dto_1.UpdateFieldDefinitionDto]),
    __metadata("design:returntype", void 0)
], FieldDefinitionsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], FieldDefinitionsController.prototype, "remove", null);
exports.FieldDefinitionsController = FieldDefinitionsController = __decorate([
    (0, common_1.Controller)('fields'),
    __metadata("design:paramtypes", [field_definitions_service_1.FieldDefinitionsService])
], FieldDefinitionsController);
//# sourceMappingURL=field-definitions.controller.js.map
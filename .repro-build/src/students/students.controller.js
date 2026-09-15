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
exports.StudentsController = void 0;
const common_1 = require("@nestjs/common");
const students_service_1 = require("./students.service");
const create_student_dto_1 = require("./dto/create-student.dto");
const update_student_dto_1 = require("./dto/update-student.dto");
const query_students_dto_1 = require("./dto/query-students.dto");
const reorder_students_dto_1 = require("./dto/reorder-students.dto");
const bulk_update_students_dto_1 = require("./dto/bulk-update-students.dto");
const seed_demo_students_dto_1 = require("./dto/seed-demo-students.dto");
let StudentsController = class StudentsController {
    constructor(studentsService) {
        this.studentsService = studentsService;
    }
    create(dto) {
        return this.studentsService.create(dto);
    }
    findAll(query) {
        return this.studentsService.findAll(query);
    }
    bulkUpdate(dto) {
        return this.studentsService.bulkUpdate(dto);
    }
    seedDemo(dto) {
        return this.studentsService.seedDemo(dto);
    }
    reorder(dto) {
        return this.studentsService.reorder(dto);
    }
    findOne(id) {
        return this.studentsService.findOne(id);
    }
    update(id, dto) {
        return this.studentsService.update(id, dto);
    }
    remove(id) {
        return this.studentsService.remove(id);
    }
};
exports.StudentsController = StudentsController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_student_dto_1.CreateStudentDto]),
    __metadata("design:returntype", void 0)
], StudentsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_students_dto_1.QueryStudentsDto]),
    __metadata("design:returntype", void 0)
], StudentsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)('bulk-update'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [bulk_update_students_dto_1.BulkUpdateStudentsDto]),
    __metadata("design:returntype", void 0)
], StudentsController.prototype, "bulkUpdate", null);
__decorate([
    (0, common_1.Post)('seed-demo'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [seed_demo_students_dto_1.SeedDemoStudentsDto]),
    __metadata("design:returntype", void 0)
], StudentsController.prototype, "seedDemo", null);
__decorate([
    (0, common_1.Patch)('reorder'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [reorder_students_dto_1.ReorderStudentsDto]),
    __metadata("design:returntype", void 0)
], StudentsController.prototype, "reorder", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], StudentsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_student_dto_1.UpdateStudentDto]),
    __metadata("design:returntype", void 0)
], StudentsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], StudentsController.prototype, "remove", null);
exports.StudentsController = StudentsController = __decorate([
    (0, common_1.Controller)('students'),
    __metadata("design:paramtypes", [students_service_1.StudentsService])
], StudentsController);
//# sourceMappingURL=students.controller.js.map
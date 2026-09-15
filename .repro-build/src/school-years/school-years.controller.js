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
exports.SchoolYearsController = void 0;
const common_1 = require("@nestjs/common");
const school_years_service_1 = require("./school-years.service");
const create_school_year_dto_1 = require("./dto/create-school-year.dto");
const update_school_year_dto_1 = require("./dto/update-school-year.dto");
let SchoolYearsController = class SchoolYearsController {
    constructor(schoolYearsService) {
        this.schoolYearsService = schoolYearsService;
    }
    create(dto) {
        return this.schoolYearsService.create(dto);
    }
    findAll() {
        return this.schoolYearsService.findAll();
    }
    findOne(id) {
        return this.schoolYearsService.findOne(id);
    }
    update(id, dto) {
        return this.schoolYearsService.update(id, dto);
    }
    remove(id) {
        return this.schoolYearsService.remove(id);
    }
};
exports.SchoolYearsController = SchoolYearsController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_school_year_dto_1.CreateSchoolYearDto]),
    __metadata("design:returntype", void 0)
], SchoolYearsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SchoolYearsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SchoolYearsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_school_year_dto_1.UpdateSchoolYearDto]),
    __metadata("design:returntype", void 0)
], SchoolYearsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SchoolYearsController.prototype, "remove", null);
exports.SchoolYearsController = SchoolYearsController = __decorate([
    (0, common_1.Controller)('school-years'),
    __metadata("design:paramtypes", [school_years_service_1.SchoolYearsService])
], SchoolYearsController);
//# sourceMappingURL=school-years.controller.js.map
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaExceptionFilter = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const http_exception_filter_1 = require("./http-exception.filter");
let PrismaExceptionFilter = class PrismaExceptionFilter {
    constructor() {
        this.fallback = new http_exception_filter_1.HttpExceptionFilter();
    }
    catch(exception, host) {
        if (exception.code === 'P2002') {
            const target = exception.meta?.target?.join(', ');
            return this.fallback.catch(new common_1.ConflictException(target ? `A record with the same ${target} already exists.` : 'Duplicate record.'), host);
        }
        if (exception.code === 'P2003') {
            return this.fallback.catch(new common_1.ConflictException('This action violates a data relationship constraint.'), host);
        }
        if (exception.code === 'P2025') {
            return this.fallback.catch(new common_1.ConflictException('Record not found or already removed.'), host);
        }
        return this.fallback.catch(exception, host);
    }
};
exports.PrismaExceptionFilter = PrismaExceptionFilter;
exports.PrismaExceptionFilter = PrismaExceptionFilter = __decorate([
    (0, common_1.Catch)(client_1.Prisma.PrismaClientKnownRequestError)
], PrismaExceptionFilter);
//# sourceMappingURL=prisma-exception.filter.js.map
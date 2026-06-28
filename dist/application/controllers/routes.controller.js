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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoutesController = void 0;
const common_1 = require("@nestjs/common");
const routes_service_1 = require("./routes.service");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
let RoutesController = class RoutesController {
    constructor(routesService) {
        this.routesService = routesService;
    }
    async optimize(payload) {
        return this.routesService.optimizeRoute(payload.points);
    }
    async reRoute(tripId, payload) {
        return this.routesService.reRoute(tripId, payload.lat, payload.lng);
    }
    async getRoute(tripId) {
        return this.routesService.getRoute(tripId);
    }
    async matrix(payload) {
        return this.routesService.getMatrix(payload.origins, payload.destinations);
    }
    async alternatives(payload) {
        return this.routesService.getAlternatives(payload.origin, payload.dest);
    }
    async simulate(payload) {
        return this.routesService.simulate(payload);
    }
};
exports.RoutesController = RoutesController;
__decorate([
    (0, common_1.Post)('optimize'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RoutesController.prototype, "optimize", null);
__decorate([
    (0, common_1.Patch)(':trip_id/re-route'),
    __param(0, (0, common_1.Param)('trip_id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], RoutesController.prototype, "reRoute", null);
__decorate([
    (0, common_1.Get)(':trip_id'),
    __param(0, (0, common_1.Param)('trip_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RoutesController.prototype, "getRoute", null);
__decorate([
    (0, common_1.Post)('matrix'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RoutesController.prototype, "matrix", null);
__decorate([
    (0, common_1.Get)('alternatives'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RoutesController.prototype, "alternatives", null);
__decorate([
    (0, common_1.Post)('simulate'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RoutesController.prototype, "simulate", null);
exports.RoutesController = RoutesController = __decorate([
    (0, common_1.Controller)('api/v1/routes'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [typeof (_a = typeof routes_service_1.RoutesService !== "undefined" && routes_service_1.RoutesService) === "function" ? _a : Object])
], RoutesController);
//# sourceMappingURL=routes.controller.js.map
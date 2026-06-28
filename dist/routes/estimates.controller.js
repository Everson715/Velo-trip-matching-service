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
exports.EstimatesController = void 0;
const common_1 = require("@nestjs/common");
const estimates_service_1 = require("./estimates.service");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
let EstimatesController = class EstimatesController {
    constructor(estimatesService) {
        this.estimatesService = estimatesService;
    }
    async estimateRoute(payload) {
        return this.estimatesService.estimateRoute(payload.origin, payload.dest);
    }
    async getEta(dLat, dLng, pLat, pLng) {
        return this.estimatesService.getEta(Number(dLat), Number(dLng), Number(pLat), Number(pLng));
    }
};
exports.EstimatesController = EstimatesController;
__decorate([
    (0, common_1.Post)('route'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], EstimatesController.prototype, "estimateRoute", null);
__decorate([
    (0, common_1.Get)('eta'),
    __param(0, (0, common_1.Query)('dLat')),
    __param(1, (0, common_1.Query)('dLng')),
    __param(2, (0, common_1.Query)('pLat')),
    __param(3, (0, common_1.Query)('pLng')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Number, Number]),
    __metadata("design:returntype", Promise)
], EstimatesController.prototype, "getEta", null);
exports.EstimatesController = EstimatesController = __decorate([
    (0, common_1.Controller)('api/v1/estimates'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [estimates_service_1.EstimatesService])
], EstimatesController);
//# sourceMappingURL=estimates.controller.js.map
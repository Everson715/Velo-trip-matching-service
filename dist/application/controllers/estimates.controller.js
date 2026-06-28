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
const estimates_service_1 = require("../../domain/services/estimates.service");
const estimates_dto_1 = require("../dtos/estimates.dto");
let EstimatesController = class EstimatesController {
    constructor(estimatesService) {
        this.estimatesService = estimatesService;
    }
    estimateRoute(estimateRouteDto) {
        return this.estimatesService.estimateRoute(estimateRouteDto);
    }
    getEta() {
        return this.estimatesService.getEta();
    }
};
exports.EstimatesController = EstimatesController;
__decorate([
    (0, common_1.Post)('route'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [estimates_dto_1.EstimateRouteDto]),
    __metadata("design:returntype", void 0)
], EstimatesController.prototype, "estimateRoute", null);
__decorate([
    (0, common_1.Get)('eta'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], EstimatesController.prototype, "getEta", null);
exports.EstimatesController = EstimatesController = __decorate([
    (0, common_1.Controller)('estimates'),
    __metadata("design:paramtypes", [estimates_service_1.EstimatesService])
], EstimatesController);
//# sourceMappingURL=estimates.controller.js.map
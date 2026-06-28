"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PricingModule = void 0;
const common_1 = require("@nestjs/common");
const pricing_service_1 = require("../domain/services/pricing.service");
const pricing_controller_1 = require("../application/controllers/pricing.controller");
const prisma_module_1 = require("../infrastructure/database/prisma.module");
const pricing_repository_interface_1 = require("../domain/interfaces/pricing.repository.interface");
const prisma_pricing_repository_1 = require("../infrastructure/database/repositories/prisma-pricing.repository");
let PricingModule = class PricingModule {
};
exports.PricingModule = PricingModule;
exports.PricingModule = PricingModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_module_1.PrismaModule],
        controllers: [pricing_controller_1.PricingController],
        providers: [
            pricing_service_1.PricingService,
            {
                provide: pricing_repository_interface_1.I_PRICING_REPOSITORY,
                useClass: prisma_pricing_repository_1.PrismaPricingRepository,
            }
        ],
        exports: [pricing_service_1.PricingService],
    })
], PricingModule);
//# sourceMappingURL=pricing.module.js.map
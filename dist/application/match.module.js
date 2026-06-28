"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MatchModule = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
const match_service_1 = require("../domain/services/match.service");
const match_controller_1 = require("./controllers/match.controller");
const pricing_module_1 = require("../pricing/pricing.module");
const trip_repository_interface_1 = require("../domain/interfaces/trip.repository.interface");
const prisma_trip_repository_1 = require("../infrastructure/database/repositories/prisma-trip.repository");
const payment_gateway_interface_1 = require("../domain/interfaces/payment.gateway.interface");
const stripe_payment_gateway_1 = require("../infrastructure/adapters/stripe-payment.gateway");
let MatchModule = class MatchModule {
};
exports.MatchModule = MatchModule;
exports.MatchModule = MatchModule = __decorate([
    (0, common_1.Module)({
        imports: [axios_1.HttpModule, pricing_module_1.PricingModule],
        controllers: [match_controller_1.MatchController],
        providers: [
            match_service_1.MatchService,
            {
                provide: trip_repository_interface_1.I_TRIP_REPOSITORY,
                useClass: prisma_trip_repository_1.PrismaTripRepository,
            },
            {
                provide: payment_gateway_interface_1.I_PAYMENT_GATEWAY,
                useClass: stripe_payment_gateway_1.StripePaymentGateway,
            },
        ],
    })
], MatchModule);
//# sourceMappingURL=match.module.js.map
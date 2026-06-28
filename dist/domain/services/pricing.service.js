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
exports.PricingService = void 0;
const common_1 = require("@nestjs/common");
const pricing_repository_interface_1 = require("../interfaces/pricing.repository.interface");
let PricingService = class PricingService {
    constructor(pricingRepository) {
        this.pricingRepository = pricingRepository;
    }
    async getZones() {
        return this.pricingRepository.findActiveZones();
    }
    async getSurge(lat, lng) {
        const baseDemand = Math.random();
        let multiplier = 1.0;
        if (baseDemand > 0.8)
            multiplier = 2.0;
        else if (baseDemand > 0.5)
            multiplier = 1.5;
        return { multiplier };
    }
    async farePreview(dto) {
        const surge = await this.getSurge(dto.origin_lat, dto.origin_lng);
        const baseMin = 10.0;
        const baseMax = 15.0;
        return {
            min_fare: baseMin * surge.multiplier,
            max_fare: baseMax * surge.multiplier,
            surge_multiplier: surge.multiplier
        };
    }
    async calculateFare(trip) {
        const baseFare = 5.0;
        const pricePerKm = 1.5;
        const distanceKm = 10;
        const surge = await this.getSurge(Number(trip.origin_lat), Number(trip.origin_lng));
        const calculatedFare = (baseFare + (pricePerKm * distanceKm)) * surge.multiplier;
        return { final_fare: calculatedFare };
    }
    async breakdown(tripId) {
        const trip = await this.pricingRepository.findById(tripId);
        if (!trip)
            return null;
        const surge = await this.getSurge(Number(trip.origin_lat), Number(trip.origin_lng));
        return {
            base: 5.0,
            distance: 15.0,
            time: 2.0,
            surge: surge.multiplier,
            total: 22.0 * surge.multiplier
        };
    }
};
exports.PricingService = PricingService;
exports.PricingService = PricingService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(pricing_repository_interface_1.I_PRICING_REPOSITORY)),
    __metadata("design:paramtypes", [Object])
], PricingService);
//# sourceMappingURL=pricing.service.js.map
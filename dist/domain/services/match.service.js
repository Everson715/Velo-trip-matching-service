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
var MatchService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MatchService = void 0;
const common_1 = require("@nestjs/common");
const pricing_service_1 = require("./pricing.service");
const trip_entity_1 = require("../entities/trip.entity");
const trip_repository_interface_1 = require("../interfaces/trip.repository.interface");
const payment_gateway_interface_1 = require("../interfaces/payment.gateway.interface");
let MatchService = MatchService_1 = class MatchService {
    constructor(tripRepository, paymentGateway, pricingService) {
        this.tripRepository = tripRepository;
        this.paymentGateway = paymentGateway;
        this.pricingService = pricingService;
        this.logger = new common_1.Logger(MatchService_1.name);
    }
    async requestTrip(passengerId, dto) {
        return this.tripRepository.create({
            passenger_id: String(passengerId),
            origin_lat: dto.origin_lat,
            origin_lng: dto.origin_lng,
            dest_lat: dto.dest_lat,
            dest_lng: dto.dest_lng,
            estimated_price: dto.estimated_price,
            status: trip_entity_1.TripStatus.SEARCHING,
        });
    }
    async getStatus(tripId) {
        const trip = await this.tripRepository.findById(tripId);
        if (!trip)
            throw new common_1.NotFoundException('Trip not found');
        return trip;
    }
    async cancelTrip(passengerId, tripId) {
        const trip = await this.getStatus(tripId);
        if (trip.passenger_id !== String(passengerId)) {
            throw new common_1.ForbiddenException('IDOR: Not your trip');
        }
        if (trip.status !== trip_entity_1.TripStatus.SEARCHING && trip.status !== trip_entity_1.TripStatus.MATCHED) {
            throw new common_1.BadRequestException('Cannot cancel trip at this stage');
        }
        const updated = await this.tripRepository.updateStatusSafe(tripId, trip.status, trip_entity_1.TripStatus.CANCELLED);
        if (!updated) {
            throw new common_1.ConflictException('Concurrency error: the trip status was changed by another process.');
        }
        return updated;
    }
    async getAvailableTrips(driverLat, driverLng) {
        return this.tripRepository.findAvailableTrips();
    }
    async acceptTrip(driverId, tripId) {
        const trip = await this.tripRepository.assignDriverOptimistic(tripId, String(driverId));
        if (!trip) {
            throw new common_1.BadRequestException('Trip already taken, cancelled or not found');
        }
        return trip;
    }
    async declineTrip(driverId, tripId) {
        return { success: true };
    }
    async arriveTrip(driverId, tripId) {
        const trip = await this.getStatus(tripId);
        if (trip.driver_id !== String(driverId)) {
            throw new common_1.ForbiddenException('IDOR: Not your assigned trip');
        }
        if (trip.status !== trip_entity_1.TripStatus.MATCHED) {
            throw new common_1.BadRequestException('Invalid state transition. Must be MATCHED.');
        }
        const updated = await this.tripRepository.updateStatusSafe(tripId, trip_entity_1.TripStatus.MATCHED, trip_entity_1.TripStatus.ARRIVED);
        if (!updated) {
            throw new common_1.ConflictException('Concurrency error: the trip status was changed by another process.');
        }
        return updated;
    }
    async startTrip(driverId, tripId) {
        const trip = await this.getStatus(tripId);
        if (trip.driver_id !== String(driverId)) {
            throw new common_1.ForbiddenException('IDOR: Not your assigned trip');
        }
        if (trip.status !== trip_entity_1.TripStatus.ARRIVED) {
            throw new common_1.BadRequestException('Invalid state transition. Must be ARRIVED.');
        }
        const updated = await this.tripRepository.updateStatusSafe(tripId, trip_entity_1.TripStatus.ARRIVED, trip_entity_1.TripStatus.IN_PROGRESS);
        if (!updated) {
            throw new common_1.ConflictException('Concurrency error: the trip status was changed by another process.');
        }
        return updated;
    }
    async completeTrip(driverId, tripId) {
        const trip = await this.getStatus(tripId);
        if (trip.driver_id !== String(driverId)) {
            throw new common_1.ForbiddenException('IDOR: Not your assigned trip');
        }
        if (trip.status !== trip_entity_1.TripStatus.IN_PROGRESS) {
            throw new common_1.BadRequestException('Invalid state transition. Must be IN_PROGRESS.');
        }
        const fareDetails = await this.pricingService.calculateFare(trip);
        const finalPrice = fareDetails.final_fare || Number(trip.estimated_price);
        const updated = await this.tripRepository.updateStatusSafe(tripId, trip_entity_1.TripStatus.IN_PROGRESS, trip_entity_1.TripStatus.COMPLETED, {
            final_price: finalPrice
        });
        if (!updated) {
            throw new common_1.ConflictException('Concurrency error: the trip status was changed by another process.');
        }
        try {
            this.logger.log(`Chamando capturePayment para a trip: ${trip.id}`);
            const paymentCaptured = await this.paymentGateway.capturePayment(trip.id, finalPrice, trip.passenger_id);
            if (!paymentCaptured) {
                this.logger.warn(`Trip ${tripId} completed but payment capture failed.`);
            }
        }
        catch (error) {
            this.logger.error(`Failed to capture payment for trip ${tripId}: ${error.message}`);
        }
        return updated;
    }
};
exports.MatchService = MatchService;
exports.MatchService = MatchService = MatchService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(trip_repository_interface_1.I_TRIP_REPOSITORY)),
    __param(1, (0, common_1.Inject)(payment_gateway_interface_1.I_PAYMENT_GATEWAY)),
    __metadata("design:paramtypes", [Object, Object, pricing_service_1.PricingService])
], MatchService);
//# sourceMappingURL=match.service.js.map
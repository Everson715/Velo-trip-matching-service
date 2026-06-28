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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaTripRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
const client_1 = require("@prisma/client");
let PrismaTripRepository = class PrismaTripRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(data) {
        return this.prisma.trip.create({
            data: {
                ...data,
                status: data.status,
            },
        });
    }
    async findById(id) {
        const trip = await this.prisma.trip.findUnique({ where: { id } });
        return trip;
    }
    async findAvailableTrips() {
        const trips = await this.prisma.trip.findMany({
            where: { status: client_1.TripStatus.SEARCHING },
        });
        return trips;
    }
    async update(id, data) {
        const trip = await this.prisma.trip.update({
            where: { id },
            data: {
                ...data,
                status: data.status ? data.status : undefined,
            },
        });
        return trip;
    }
    async assignDriverOptimistic(tripId, driverId) {
        const result = await this.prisma.trip.updateMany({
            where: { id: tripId, status: client_1.TripStatus.SEARCHING },
            data: { status: client_1.TripStatus.MATCHED, driver_id: String(driverId) },
        });
        if (result.count === 0)
            return null;
        return this.findById(tripId);
    }
    async updateStatusSafe(tripId, oldStatus, newStatus, data = {}) {
        const result = await this.prisma.trip.updateMany({
            where: {
                id: tripId,
                status: oldStatus,
            },
            data: {
                status: newStatus,
                ...data,
            },
        });
        if (result.count === 0)
            return null;
        return this.findById(tripId);
    }
};
exports.PrismaTripRepository = PrismaTripRepository;
exports.PrismaTripRepository = PrismaTripRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PrismaTripRepository);
//# sourceMappingURL=prisma-trip.repository.js.map
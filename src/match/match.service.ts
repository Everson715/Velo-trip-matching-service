import { Injectable, BadRequestException, ForbiddenException, NotFoundException, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { TripStatus } from '@prisma/client';
import { CreateTripDto } from './dto/create-trip.dto';
import { PaymentIntegrationClient } from './payment.client';
import { PricingService } from '../pricing/pricing.service';

@Injectable()
export class MatchService {
  private readonly logger = new Logger(MatchService.name);

  constructor(
    private prisma: PrismaService,
    private paymentClient: PaymentIntegrationClient,
    private pricingService: PricingService,
  ) {}

  async requestTrip(passengerId: any, dto: CreateTripDto) {
    return this.prisma.trip.create({
      data: {
        passenger_id: String(passengerId),
        origin_lat: dto.origin_lat,
        origin_lng: dto.origin_lng,
        dest_lat: dto.dest_lat,
        dest_lng: dto.dest_lng,
        estimated_price: dto.estimated_price,
        status: TripStatus.SEARCHING,
      },
    });
  }

  async getStatus(tripId: string) {
    const trip = await this.prisma.trip.findUnique({ where: { id: tripId } });
    if (!trip) throw new NotFoundException('Trip not found');
    return trip;
  }

  async cancelTrip(passengerId: any, tripId: string) {
    return this.prisma.$transaction(async (tx) => {
      const trip = await tx.trip.findUnique({ where: { id: tripId } });
      if (!trip) throw new NotFoundException('Trip not found');
      
      if (trip.passenger_id !== String(passengerId)) {
        throw new ForbiddenException('IDOR: Not your trip');
      }
      
      if (trip.status !== TripStatus.SEARCHING && trip.status !== TripStatus.MATCHED) {
        throw new BadRequestException('Cannot cancel trip at this stage');
      }
      
      return tx.trip.update({
        where: { id: tripId },
        data: { status: TripStatus.CANCELLED },
      });
    });
  }

  async getAvailableTrips(driverLat: number, driverLng: number) {
    return this.prisma.trip.findMany({
      where: { status: TripStatus.SEARCHING },
    });
  }

  async acceptTrip(driverId: any, tripId: string) {
    // Utilizando o updateMany como lock otimista (mitigar race condition)
    const result = await this.prisma.trip.updateMany({
      where: { id: tripId, status: TripStatus.SEARCHING },
      data: { status: TripStatus.MATCHED, driver_id: String(driverId) },
    });

    if (result.count === 0) {
      throw new BadRequestException('Trip already taken, cancelled or not found');
    }

    return this.prisma.trip.findUnique({ where: { id: tripId } });
  }

  async declineTrip(driverId: any, tripId: string) {
    return { success: true };
  }

  async arriveTrip(driverId: any, tripId: string) {
    return this.prisma.$transaction(async (tx) => {
      const trip = await tx.trip.findUnique({ where: { id: tripId } });
      if (!trip) throw new NotFoundException('Trip not found');
      
      if (trip.driver_id !== String(driverId)) {
        throw new ForbiddenException('IDOR: Not your assigned trip');
      }
      if (trip.status !== TripStatus.MATCHED) {
        throw new BadRequestException('Invalid state transition. Must be MATCHED.');
      }

      return tx.trip.update({
        where: { id: tripId },
        data: { status: TripStatus.ARRIVED },
      });
    });
  }

  async startTrip(driverId: any, tripId: string) {
    return this.prisma.$transaction(async (tx) => {
      const trip = await tx.trip.findUnique({ where: { id: tripId } });
      if (!trip) throw new NotFoundException('Trip not found');
      
      if (trip.driver_id !== String(driverId)) {
        throw new ForbiddenException('IDOR: Not your assigned trip');
      }
      if (trip.status !== TripStatus.ARRIVED) {
        throw new BadRequestException('Invalid state transition. Must be ARRIVED.');
      }

      return tx.trip.update({
        where: { id: tripId },
        data: { status: TripStatus.IN_PROGRESS },
      });
    });
  }

  async completeTrip(driverId: any, tripId: string) {
    return this.prisma.$transaction(async (tx) => {
      const trip = await tx.trip.findUnique({ where: { id: tripId } });
      if (!trip) throw new NotFoundException('Trip not found');
      
      if (trip.driver_id !== String(driverId)) {
        throw new ForbiddenException('IDOR: Not your assigned trip');
      }
      if (trip.status !== TripStatus.IN_PROGRESS) {
        throw new BadRequestException('Invalid state transition. Must be IN_PROGRESS.');
      }

      // Calculation of final price using PricingService
      const fareDetails = await this.pricingService.calculateFare(tripId);
      const finalPrice = fareDetails.final_fare || Number(trip.estimated_price);

      const updated = await tx.trip.update({
        where: { id: tripId },
        data: { status: TripStatus.COMPLETED, final_price: finalPrice },
      });

      // Disparar captura de pagamento
      const paymentCaptured = await this.paymentClient.capturePayment(trip.id, finalPrice, trip.passenger_id);
      if (!paymentCaptured) {
        this.logger.warn(`Trip ${tripId} completed but payment capture failed or is pending.`);
      }

      return updated;
    });
  }
}
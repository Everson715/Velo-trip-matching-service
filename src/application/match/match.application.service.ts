import {
  Inject,
  Injectable,
  BadRequestException,
  NotFoundException,
  Logger,
} from '@nestjs/common';
import { TripStatus } from '@prisma/client';
import { TripRepository } from '../../infrastructure/database/repositories/trip.repository';
import { PaymentIntegrationClient } from '../../infrastructure/external/payment/payment.client';
import { TripMatchingService } from '../../business/match/trip-matching.service';
import { PricingService } from '../../business/pricing/pricing.service';
import { CreateTripDto } from './dto/create-trip.dto';

@Injectable()
export class MatchApplicationService {
  private readonly logger = new Logger(MatchApplicationService.name);

  constructor(
    private readonly tripRepository: TripRepository,
    private readonly tripMatchingService: TripMatchingService,
    private readonly pricingService: PricingService,
    @Inject('PAYMENT_INTEGRATION_CLIENT')
    private readonly paymentClient: PaymentIntegrationClient,
  ) {}

  requestTrip(passengerId: string, dto: CreateTripDto) {
    return this.tripRepository.create({
      passenger_id: String(passengerId),
      origin_lat: dto.origin_lat,
      origin_lng: dto.origin_lng,
      dest_lat: dto.dest_lat,
      dest_lng: dto.dest_lng,
      estimated_price: dto.estimated_price,
    });
  }

  async getStatus(tripId: string) {
    const trip = await this.tripRepository.findById(tripId);
    if (!trip) throw new NotFoundException('Trip not found');
    return trip;
  }

  async cancelTrip(passengerId: string, tripId: string) {
    return this.tripRepository.runInTransaction(async (tx) => {
      const trip = await this.tripRepository.findByIdWithTx(tx, tripId);
      if (!trip) throw new NotFoundException('Trip not found');

      this.tripMatchingService.assertPassengerOwnership(trip, passengerId);
      this.tripMatchingService.assertCanCancel(trip);

      return this.tripRepository.updateStatusWithTx(tx, tripId, TripStatus.CANCELLED);
    });
  }

  getAvailableTrips(_driverLat: number, _driverLng: number) {
    return this.tripRepository.findSearchingTrips();
  }

  async acceptTrip(driverId: string, tripId: string) {
    const updatedCount = await this.tripRepository.acceptTrip(tripId, String(driverId));

    if (updatedCount === 0) {
      throw new BadRequestException('Trip already taken, cancelled or not found');
    }

    return this.tripRepository.findById(tripId);
  }

  declineTrip(_driverId: string, _tripId: string) {
    return { success: true };
  }

  async arriveTrip(driverId: string, tripId: string) {
    return this.tripRepository.runInTransaction(async (tx) => {
      const trip = await this.tripRepository.findByIdWithTx(tx, tripId);
      if (!trip) throw new NotFoundException('Trip not found');

      this.tripMatchingService.assertDriverOwnership(trip, driverId);
      this.tripMatchingService.assertCanArrive(trip);

      return this.tripRepository.updateStatusWithTx(tx, tripId, TripStatus.ARRIVED);
    });
  }

  async startTrip(driverId: string, tripId: string) {
    return this.tripRepository.runInTransaction(async (tx) => {
      const trip = await this.tripRepository.findByIdWithTx(tx, tripId);
      if (!trip) throw new NotFoundException('Trip not found');

      this.tripMatchingService.assertDriverOwnership(trip, driverId);
      this.tripMatchingService.assertCanStart(trip);

      return this.tripRepository.updateStatusWithTx(tx, tripId, TripStatus.IN_PROGRESS);
    });
  }

  async completeTrip(driverId: string, tripId: string) {
    return this.tripRepository.runInTransaction(async (tx) => {
      const trip = await this.tripRepository.findByIdWithTx(tx, tripId);
      if (!trip) throw new NotFoundException('Trip not found');

      this.tripMatchingService.assertDriverOwnership(trip, driverId);
      this.tripMatchingService.assertCanComplete(trip);

      const fareDetails = this.pricingService.calculateFare(trip);
      const finalPrice = fareDetails.final_fare || Number(trip.estimated_price);

      const updated = await this.tripRepository.updateStatusWithTx(
        tx,
        tripId,
        TripStatus.COMPLETED,
        finalPrice,
      );

      try {
        this.logger.log(`Chamando capturePayment para a trip: ${trip.id}`);
        const paymentCaptured = await this.paymentClient.capturePayment(
          trip.id,
          finalPrice,
          trip.passenger_id,
        );
        if (!paymentCaptured) {
          this.logger.warn(`Trip ${tripId} completed but payment capture failed.`);
        }
      } catch (error) {
        this.logger.error(`Failed to capture payment for trip ${tripId}: ${error.message}`);
      }

      return updated;
    });
  }
}

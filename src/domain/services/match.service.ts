import { Inject, Injectable, BadRequestException, ForbiddenException, NotFoundException, Logger } from '@nestjs/common';
import { CreateTripDto } from '../../application/dtos/create-trip.dto';
import { PricingService } from './pricing.service';
import { TripStatus } from '../entities/trip.entity';
import { ITripRepository, I_TRIP_REPOSITORY } from '../interfaces/trip.repository.interface';
import { IPaymentGateway, I_PAYMENT_GATEWAY } from '../interfaces/payment.gateway.interface';

@Injectable()
export class MatchService {
  private readonly logger = new Logger(MatchService.name);

  constructor(
    @Inject(I_TRIP_REPOSITORY) private tripRepository: ITripRepository,
    @Inject(I_PAYMENT_GATEWAY) private paymentGateway: IPaymentGateway,
    private pricingService: PricingService,
  ) {}

  async requestTrip(passengerId: any, dto: CreateTripDto) {
    return this.tripRepository.create({
      passenger_id: String(passengerId),
      origin_lat: dto.origin_lat,
      origin_lng: dto.origin_lng,
      dest_lat: dto.dest_lat,
      dest_lng: dto.dest_lng,
      estimated_price: dto.estimated_price,
      status: TripStatus.SEARCHING,
    });
  }

  async getStatus(tripId: string) {
    const trip = await this.tripRepository.findById(tripId);
    if (!trip) throw new NotFoundException('Trip not found');
    return trip;
  }

  async cancelTrip(passengerId: any, tripId: string) {
    const trip = await this.getStatus(tripId);
    
    if (trip.passenger_id !== String(passengerId)) {
      throw new ForbiddenException('IDOR: Not your trip');
    }
    
    if (trip.status !== TripStatus.SEARCHING && trip.status !== TripStatus.MATCHED) {
      throw new BadRequestException('Cannot cancel trip at this stage');
    }
    
    return this.tripRepository.update(tripId, { status: TripStatus.CANCELLED });
  }

  async getAvailableTrips(driverLat: number, driverLng: number) {
    return this.tripRepository.findAvailableTrips();
  }

  async acceptTrip(driverId: any, tripId: string) {
    const trip = await this.tripRepository.assignDriverOptimistic(tripId, String(driverId));

    if (!trip) {
      throw new BadRequestException('Trip already taken, cancelled or not found');
    }

    return trip;
  }

  async declineTrip(driverId: any, tripId: string) {
    return { success: true };
  }

  async arriveTrip(driverId: any, tripId: string) {
    const trip = await this.getStatus(tripId);
    
    if (trip.driver_id !== String(driverId)) {
      throw new ForbiddenException('IDOR: Not your assigned trip');
    }
    if (trip.status !== TripStatus.MATCHED) {
      throw new BadRequestException('Invalid state transition. Must be MATCHED.');
    }

    return this.tripRepository.update(tripId, { status: TripStatus.ARRIVED });
  }

  async startTrip(driverId: any, tripId: string) {
    const trip = await this.getStatus(tripId);
    
    if (trip.driver_id !== String(driverId)) {
      throw new ForbiddenException('IDOR: Not your assigned trip');
    }
    if (trip.status !== TripStatus.ARRIVED) {
      throw new BadRequestException('Invalid state transition. Must be ARRIVED.');
    }

    return this.tripRepository.update(tripId, { status: TripStatus.IN_PROGRESS });
  }

  async completeTrip(driverId: string, tripId: string) {
    const trip = await this.getStatus(tripId);

    if (trip.driver_id !== String(driverId)) {
      throw new ForbiddenException('IDOR: Not your assigned trip');
    }
    if (trip.status !== TripStatus.IN_PROGRESS) {
      throw new BadRequestException('Invalid state transition. Must be IN_PROGRESS.');
    }

    const fareDetails = await this.pricingService.calculateFare(trip as any); // cast for now until pricing is fully refactored
    const finalPrice = fareDetails.final_fare || Number(trip.estimated_price);

    const updated = await this.tripRepository.update(tripId, { 
      status: TripStatus.COMPLETED, 
      final_price: finalPrice 
    });

    try {
      this.logger.log(`Chamando capturePayment para a trip: ${trip.id}`);
      const paymentCaptured = await this.paymentGateway.capturePayment(trip.id, finalPrice, trip.passenger_id);
      if (!paymentCaptured) {
        this.logger.warn(`Trip ${tripId} completed but payment capture failed.`);
      }
    } catch (error) {
      this.logger.error(`Failed to capture payment for trip ${tripId}: ${error.message}`);
    }

    return updated;
  }
}
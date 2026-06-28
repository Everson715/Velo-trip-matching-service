import { Injectable, NotFoundException } from '@nestjs/common';
import { PricingZoneRepository } from '../../infrastructure/database/repositories/pricing-zone.repository';
import { TripRepository } from '../../infrastructure/database/repositories/trip.repository';
import { PricingService } from '../../business/pricing/pricing.service';
import { CreateTripDto } from '../match/dto/create-trip.dto';

@Injectable()
export class PricingApplicationService {
  constructor(
    private readonly pricingZoneRepository: PricingZoneRepository,
    private readonly tripRepository: TripRepository,
    private readonly pricingService: PricingService,
  ) {}

  getZones() {
    return this.pricingZoneRepository.findActiveZones();
  }

  async calculateFareByTripId(tripId: string) {
    const trip = await this.tripRepository.findById(tripId);
    if (!trip) throw new NotFoundException('Trip not found');
    return this.pricingService.calculateFare(trip);
  }

  farePreview(dto: CreateTripDto) {
    return this.pricingService.farePreview(dto);
  }

  async breakdown(tripId: string) {
    const trip = await this.tripRepository.findById(tripId);
    if (!trip) return null;
    return this.pricingService.breakdown(trip);
  }
}

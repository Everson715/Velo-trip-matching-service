import { Injectable, Inject } from '@nestjs/common';
import { CreateTripDto } from '../../application/dtos/create-trip.dto';
import { Trip } from '../entities/trip.entity';
import { IPricingRepository, I_PRICING_REPOSITORY } from '../interfaces/pricing.repository.interface';

@Injectable()
export class PricingService {
  constructor(
    @Inject(I_PRICING_REPOSITORY) private pricingRepository: IPricingRepository
  ) {}

  async getZones() {
    return this.pricingRepository.findActiveZones();
  }

  async getSurge(lat: number, lng: number) {
    const baseDemand = Math.random(); 
    let multiplier = 1.0;
    
    if (baseDemand > 0.8) multiplier = 2.0;
    else if (baseDemand > 0.5) multiplier = 1.5;

    return { multiplier };
  }

  async farePreview(dto: CreateTripDto) {
    const surge = await this.getSurge(dto.origin_lat, dto.origin_lng);
    const baseMin = 10.0;
    const baseMax = 15.0;

    return { 
      min_fare: baseMin * surge.multiplier, 
      max_fare: baseMax * surge.multiplier,
      surge_multiplier: surge.multiplier
    };
  }

  async calculateFare(trip: Trip) {
    const baseFare = 5.0;
    const pricePerKm = 1.5;
    const distanceKm = 10; 

    const surge = await this.getSurge(Number(trip.origin_lat), Number(trip.origin_lng));
    const calculatedFare = (baseFare + (pricePerKm * distanceKm)) * surge.multiplier;

    return { final_fare: calculatedFare };
  }

  async breakdown(tripId: string) {
    const trip = await this.pricingRepository.findById(tripId);
    if (!trip) return null;

    const surge = await this.getSurge(Number(trip.origin_lat), Number(trip.origin_lng));
    return { 
      base: 5.0, 
      distance: 15.0, 
      time: 2.0, 
      surge: surge.multiplier, 
      total: 22.0 * surge.multiplier 
    };
  }
}
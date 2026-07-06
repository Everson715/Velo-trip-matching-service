import { Injectable } from '@nestjs/common';
import { Trip } from '@prisma/client';

export interface FarePreviewInput {
  origin_lat: number;
  origin_lng: number;
}

export interface SurgeResult {
  multiplier: number;
}

export interface FarePreviewResult {
  min_fare: number;
  max_fare: number;
  surge_multiplier: number;
}

export interface FareCalculationResult {
  final_fare: number;
}

export interface FareBreakdownResult {
  base: number;
  distance: number;
  time: number;
  surge: number;
  total: number;
}

@Injectable()
export class PricingService {
  calculateSurge(_lat: number, _lng: number): SurgeResult {
    const baseDemand = Math.random();
    let multiplier = 1.0;

    if (baseDemand > 0.8) multiplier = 2.0;
    else if (baseDemand > 0.5) multiplier = 1.5;

    return { multiplier };
  }

  farePreview(input: FarePreviewInput): FarePreviewResult {
    const surge = this.calculateSurge(input.origin_lat, input.origin_lng);
    const baseMin = 10.0;
    const baseMax = 15.0;

    return {
      min_fare: baseMin * surge.multiplier,
      max_fare: baseMax * surge.multiplier,
      surge_multiplier: surge.multiplier,
    };
  }

  calculateFare(trip: Trip, distanceKm = 10): FareCalculationResult {
    const baseFare = 5.0;
    const pricePerKm = 1.5;
    const surge = this.calculateSurge(Number(trip.origin_lat), Number(trip.origin_lng));
    const calculatedFare = (baseFare + pricePerKm * distanceKm) * surge.multiplier;

    return { final_fare: calculatedFare };
  }

  breakdown(trip: Trip): FareBreakdownResult {
    const surge = this.calculateSurge(Number(trip.origin_lat), Number(trip.origin_lng));

    return {
      base: 5.0,
      distance: 15.0,
      time: 2.0,
      surge: surge.multiplier,
      total: 22.0 * surge.multiplier,
    };
  }
}

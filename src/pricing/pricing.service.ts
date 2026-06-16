import { Injectable } from '@nestjs/common';
import { FarePreviewDto, CalculateFareDto } from './dto/pricing.dto';

const BASE_FARE = 5.0;
const RATE_PER_MINUTE = 0.5;
const ZONE_MULTIPLIER: Record<string, number> = {
  A: 1.2,
  B: 1.5,
  C: 1.0,
};

@Injectable()
export class PricingService {
  getZones() {
    return Object.keys(ZONE_MULTIPLIER);
  }

  getSurgeByLocation(lat: string, lng: string) {
    return { surge: 1.0 };
  }

  getSurge() {
    return { surge: 1.0 };
  }

  getFarePreview(dto: FarePreviewDto) {
    return this.calculate(dto.distanceKm, dto.timeMinutes, dto.zone);
  }

  calculateFare(dto: CalculateFareDto) {
    return this.calculate(dto.distanceKm, dto.timeMinutes, dto.zone);
  }

  private calculate(distanceKm: number, timeMinutes: number, zone: string) {
    const multiplier = ZONE_MULTIPLIER[zone?.toUpperCase()] || 1.0;
    const distanceFare = distanceKm * multiplier;
    const timeFare = timeMinutes * RATE_PER_MINUTE;
    const total = BASE_FARE + distanceFare + timeFare;

    return {
      total: Number(total.toFixed(2)),
      breakdown: {
        baseFare: BASE_FARE,
        distanceFare: Number(distanceFare.toFixed(2)),
        timeFare: Number(timeFare.toFixed(2)),
      },
    };
  }

  getBreakdown(id: string) {
    return { id, message: 'Breakdown functionality is generic' };
  }
}

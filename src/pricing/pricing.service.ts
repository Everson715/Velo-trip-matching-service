import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PricingService {
  constructor(private prisma: PrismaService) {}

  async getZones() {
    return this.prisma.pricingZone.findMany({
      where: { active_until: { gt: new Date() } }
    });
  }

  async getSurge(lat: number, lng: number) {
    return { multiplier: 1.5 }; // Simulação H3 lookup
  }

  async getGlobalSurge() {
    return this.prisma.pricingZone.findMany();
  }

  async farePreview(payload: any) {
    return { min_fare: 20.0, max_fare: 25.0 };
  }

  async calculateFare(estimateId: string) {
    return { final_fare: 23.50 };
  }

  async breakdown(tripId: string) {
    return { base: 10, distance: 8, time: 2, surge: 1.5, total: 23.50 };
  }
}

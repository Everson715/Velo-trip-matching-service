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
    // Simulação H3 lookup baseada em demanda locacional
    // O ideal aqui seria usar bibliotecas h3-js para indexar e buscar polígonos
    const baseDemand = Math.random(); 
    let multiplier = 1.0;
    if (baseDemand > 0.8) multiplier = 2.0;
    else if (baseDemand > 0.5) multiplier = 1.5;

    return { multiplier };
  }

  async getGlobalSurge() {
    return this.prisma.pricingZone.findMany();
  }

  async farePreview(payload: any) {
    const surge = await this.getSurge(payload.origin_lat, payload.origin_lng);
    const baseMin = 10.0;
    const baseMax = 15.0;

    return { 
      min_fare: baseMin * surge.multiplier, 
      max_fare: baseMax * surge.multiplier,
      surge_multiplier: surge.multiplier
    };
  }

  async calculateFare(tripId: string) {
    const trip = await this.prisma.trip.findUnique({ where: { id: tripId } });
    if (!trip) return { final_fare: null };
    
    // Distância simulada (em um caso real consumiria do RoutesService)
    const baseFare = 5.0;
    const pricePerKm = 1.5;
    const distanceKm = 10;

    const surge = await this.getSurge(trip.origin_lat, trip.origin_lng);
    const calculatedFare = (baseFare + (pricePerKm * distanceKm)) * surge.multiplier;

    return { final_fare: calculatedFare };
  }

  async breakdown(tripId: string) {
    const trip = await this.prisma.trip.findUnique({ where: { id: tripId } });
    if (!trip) return null;

    const surge = await this.getSurge(trip.origin_lat, trip.origin_lng);
    return { base: 5.0, distance: 15.0, time: 2.0, surge: surge.multiplier, total: 22.0 * surge.multiplier };
  }
}

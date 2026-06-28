import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTripDto } from '../match/dto/create-trip.dto';
import { Trip } from '@prisma/client';

@Injectable()
export class PricingService {
  constructor(private prisma: PrismaService) {}

  /**
   * Busca zonas ativas de precificação.
   */
  async getZones() {
    return this.prisma.pricingZone.findMany({
      where: { active_until: { gt: new Date() } }
    });
  }

  /**
   * Simulação de lógica de Surge Pricing.
   */
  async getSurge(lat: number, lng: number) {
    // Simulação baseada em demanda aleatória.
    // Futuramente, aqui será feita a busca por índice H3.
    const baseDemand = Math.random(); 
    let multiplier = 1.0;
    
    if (baseDemand > 0.8) multiplier = 2.0;
    else if (baseDemand > 0.5) multiplier = 1.5;

    return { multiplier };
  }

  /**
   * Gera a estimativa de preço exibida ao passageiro antes de solicitar.
   */
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

  /**
   * Calcula o preço final no momento da conclusão da viagem.
   * Recebe a entidade Trip carregada para evitar queries extras.
   */
  async calculateFare(trip: Trip) {
    // Simulação de cálculo baseado em distância fixa
    const baseFare = 5.0;
    const pricePerKm = 1.5;
    const distanceKm = 10; // Placeholder: integrar com RoutesService

    const surge = await this.getSurge(Number(trip.origin_lat), Number(trip.origin_lng));
    const calculatedFare = (baseFare + (pricePerKm * distanceKm)) * surge.multiplier;

    return { final_fare: calculatedFare };
  }

  /**
   * Detalhamento do custo para o extrato da viagem.
   */
  async breakdown(tripId: string) {
    const trip = await this.prisma.trip.findUnique({ where: { id: tripId } });
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
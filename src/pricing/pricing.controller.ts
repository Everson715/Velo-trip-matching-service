import { Controller, Get, Param } from '@nestjs/common';
import { PricingService } from './pricing.service';
import { PrismaService } from '../prisma/prisma.service'; // Adicione isto

@Controller('pricing')
export class PricingController {
  constructor(
    private readonly pricingService: PricingService,
    private readonly prisma: PrismaService // Injete o Prisma
  ) {}

  @Get('zones')
  async getZones() {
    return this.pricingService.getZones();
  }

  // Corrigindo o calculateFare no Controller
  @Get('calculate/:tripId')
  async calculateFare(@Param('tripId') tripId: string) {
    // 1. Busca a entidade completa no banco para atender a nova assinatura
    const trip = await this.prisma.trip.findUnique({ where: { id: tripId } });
    
    if (!trip) {
      throw new Error('Trip not found');
    }

    // 2. Passa o objeto completo, não a string
    return this.pricingService.calculateFare(trip);
  }
}
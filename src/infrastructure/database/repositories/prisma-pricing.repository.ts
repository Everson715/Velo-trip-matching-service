import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { IPricingRepository } from '../../../domain/interfaces/pricing.repository.interface';

@Injectable()
export class PrismaPricingRepository implements IPricingRepository {
  constructor(private prisma: PrismaService) {}

  async findActiveZones(): Promise<any[]> {
    return this.prisma.pricingZone.findMany({
      where: { active_until: { gt: new Date() } }
    });
  }

  async findById(tripId: string): Promise<any | null> {
    return this.prisma.trip.findUnique({ where: { id: tripId } });
  }
}

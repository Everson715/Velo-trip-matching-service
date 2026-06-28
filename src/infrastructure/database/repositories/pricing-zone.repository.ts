import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PricingZone } from '@prisma/client';

@Injectable()
export class PricingZoneRepository {
  constructor(private readonly prisma: PrismaService) {}

  findActiveZones(): Promise<PricingZone[]> {
    return this.prisma.pricingZone.findMany({
      where: { active_until: { gt: new Date() } },
    });
  }
}

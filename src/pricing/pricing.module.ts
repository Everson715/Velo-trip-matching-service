import { Module } from '@nestjs/common';
import { PricingService } from '../domain/services/pricing.service';
import { PricingController } from '../application/controllers/pricing.controller';
import { PrismaModule } from '../infrastructure/database/prisma.module';
import { I_PRICING_REPOSITORY } from '../domain/interfaces/pricing.repository.interface';
import { PrismaPricingRepository } from '../infrastructure/database/repositories/prisma-pricing.repository';

@Module({
  imports: [PrismaModule],
  controllers: [PricingController],
  providers: [
    PricingService,
    {
      provide: I_PRICING_REPOSITORY,
      useClass: PrismaPricingRepository,
    }
  ],
  exports: [PricingService],
})
export class PricingModule {}
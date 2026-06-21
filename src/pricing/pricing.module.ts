import { Module } from '@nestjs/common';
import { PricingService } from './pricing.service';
import { PricingController } from './pricing.controller';
import { PrismaModule } from '../prisma/prisma.module'; // Importante para acessar o banco

@Module({
  imports: [PrismaModule], // Adicione isso para que o PricingService possa usar o PrismaService
  controllers: [PricingController],
  providers: [PricingService],
  exports: [PricingService], // Correto: permite que o MatchService injete o PricingService
})
export class PricingModule {}
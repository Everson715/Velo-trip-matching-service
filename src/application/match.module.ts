import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { MatchService } from '../domain/services/match.service';
import { MatchController } from './controllers/match.controller';
import { PricingModule } from '../pricing/pricing.module';

import { I_TRIP_REPOSITORY } from '../domain/interfaces/trip.repository.interface';
import { PrismaTripRepository } from '../infrastructure/database/repositories/prisma-trip.repository';
import { I_PAYMENT_GATEWAY } from '../domain/interfaces/payment.gateway.interface';
import { StripePaymentGateway } from '../infrastructure/adapters/stripe-payment.gateway';

@Module({
  imports: [HttpModule, PricingModule],
  controllers: [MatchController],
  providers: [
    MatchService,
    {
      provide: I_TRIP_REPOSITORY,
      useClass: PrismaTripRepository,
    },
    {
      provide: I_PAYMENT_GATEWAY,
      useClass: StripePaymentGateway,
    },
  ],
})
export class MatchModule {}

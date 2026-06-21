import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { MatchService } from './match.service';
import { MatchController } from './match.controller';
import { PaymentIntegrationClient } from './payment.client';
import { PricingModule } from '../pricing/pricing.module';

@Module({
  imports: [HttpModule, PricingModule],
  controllers: [MatchController],
  providers: [
    MatchService,
    {
      provide: 'PAYMENT_INTEGRATION_CLIENT', // Este é o token que seu teste usará
      useClass: PaymentIntegrationClient,
    },
  ],
})
export class MatchModule {}
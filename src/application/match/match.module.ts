import { Module } from '@nestjs/common';
import { MatchApplicationService } from './match.application.service';
import { MatchController } from './match.controller';
import { InfrastructureModule } from '../../infrastructure/infrastructure.module';
import { BusinessModule } from '../../business/business.module';
import { PaymentIntegrationClient } from '../../infrastructure/external/payment/payment.client';

@Module({
  imports: [InfrastructureModule, BusinessModule],
  controllers: [MatchController],
  providers: [
    MatchApplicationService,
    {
      provide: 'PAYMENT_INTEGRATION_CLIENT',
      useClass: PaymentIntegrationClient,
    },
  ],
})
export class MatchModule {}

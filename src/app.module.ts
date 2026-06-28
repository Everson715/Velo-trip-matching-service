import { Module } from '@nestjs/common';
import { InfrastructureModule } from './infrastructure/infrastructure.module';
import { MatchModule } from './application/match/match.module';
import { RoutesModule } from './application/routes/routes.module';
import { PricingModule } from './application/pricing/pricing.module';
import { EstimatesModule } from './application/estimates/estimates.module';

@Module({
  imports: [
    InfrastructureModule,
    MatchModule,
    RoutesModule,
    PricingModule,
    EstimatesModule,
  ],
})
export class AppModule {}

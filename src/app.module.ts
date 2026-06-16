import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RoutesModule } from './routes/routes.module';
import { EstimatesModule } from './estimates/estimates.module';
import { PricingModule } from './pricing/pricing.module';
import { MatchModule } from './match/match.module';

@Module({
  imports: [RoutesModule, EstimatesModule, PricingModule, MatchModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

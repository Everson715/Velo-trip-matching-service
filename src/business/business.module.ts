import { Module } from '@nestjs/common';
import { TripMatchingService } from './match/trip-matching.service';
import { PricingService } from './pricing/pricing.service';
import { RoutingService } from './routes/routing.service';
import { EstimatesService } from './estimates/estimates.service';

@Module({
  providers: [TripMatchingService, PricingService, RoutingService, EstimatesService],
  exports: [TripMatchingService, PricingService, RoutingService, EstimatesService],
})
export class BusinessModule {}

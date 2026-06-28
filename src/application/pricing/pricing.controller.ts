import { Controller, Get, Param } from '@nestjs/common';
import { PricingApplicationService } from './pricing.application.service';

@Controller('pricing')
export class PricingController {
  constructor(private readonly pricingApplicationService: PricingApplicationService) {}

  @Get('zones')
  async getZones() {
    return this.pricingApplicationService.getZones();
  }

  @Get('calculate/:tripId')
  async calculateFare(@Param('tripId') tripId: string) {
    return this.pricingApplicationService.calculateFareByTripId(tripId);
  }
}

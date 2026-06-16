import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { PricingService } from './pricing.service';
import { FarePreviewDto, CalculateFareDto } from './dto/pricing.dto';

@Controller('pricing')
export class PricingController {
  constructor(private readonly pricingService: PricingService) {}

  @Get('zones')
  getZones() {
    return this.pricingService.getZones();
  }

  @Get('surge/:lat/:lng')
  getSurgeByLocation(@Param('lat') lat: string, @Param('lng') lng: string) {
    return this.pricingService.getSurgeByLocation(lat, lng);
  }

  @Get('surge')
  getSurge() {
    return this.pricingService.getSurge();
  }

  @Post('fare-preview')
  getFarePreview(@Body() farePreviewDto: FarePreviewDto) {
    return this.pricingService.getFarePreview(farePreviewDto);
  }

  @Post('calculate')
  calculateFare(@Body() calculateFareDto: CalculateFareDto) {
    return this.pricingService.calculateFare(calculateFareDto);
  }

  @Get('breakdown/:id')
  getBreakdown(@Param('id') id: string) {
    return this.pricingService.getBreakdown(id);
  }
}

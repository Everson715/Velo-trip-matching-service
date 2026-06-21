import { Controller, Get, Post, Param, Body, UseGuards } from '@nestjs/common';
import { PricingService } from './pricing.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('api/v1/pricing')
@UseGuards(JwtAuthGuard)
export class PricingController {
  constructor(private pricingService: PricingService) {}

  @Get('zones')
  async getZones() {
    return this.pricingService.getZones();
  }

  @Get('surge/:lat/:lng')
  async getSurge(@Param('lat') lat: string, @Param('lng') lng: string) {
    return this.pricingService.getSurge(Number(lat), Number(lng));
  }

  @Get('surge')
  async getGlobalSurge() {
    return this.pricingService.getGlobalSurge();
  }

  @Post('fare-preview')
  async farePreview(@Body() payload: any) {
    return this.pricingService.farePreview(payload);
  }

  @Post('calculate')
  async calculateFare(@Body('estimate_id') estimateId: string) {
    return this.pricingService.calculateFare(estimateId);
  }

  @Get('breakdown/:id')
  async breakdown(@Param('id') id: string) {
    return this.pricingService.breakdown(id);
  }
}

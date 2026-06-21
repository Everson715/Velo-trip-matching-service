import { Controller, Post, Get, Body, Query, UseGuards } from '@nestjs/common';
import { EstimatesService } from './estimates.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('api/v1/estimates')
@UseGuards(JwtAuthGuard)
export class EstimatesController {
  constructor(private readonly estimatesService: EstimatesService) {}

  @Post('route')
  async estimateRoute(@Body() payload: any) {
    return this.estimatesService.estimateRoute(payload.origin, payload.dest);
  }

  @Get('eta')
  async getEta(@Query('dLat') dLat: number, @Query('dLng') dLng: number, @Query('pLat') pLat: number, @Query('pLng') pLng: number) {
    return this.estimatesService.getEta(Number(dLat), Number(dLng), Number(pLat), Number(pLng));
  }
}

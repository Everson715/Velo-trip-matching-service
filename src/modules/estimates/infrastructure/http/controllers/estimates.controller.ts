import { Controller, Post, Get, Body, Query, UseGuards } from '@nestjs/common';
import { EstimatesApplicationService } from './estimates.application.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('estimates')
@UseGuards(JwtAuthGuard)
export class EstimatesController {
  constructor(private readonly estimatesApplicationService: EstimatesApplicationService) {}

  @Post('route')
  async estimateRoute(@Body() payload: any) {
    return this.estimatesApplicationService.estimateRoute(payload.origin, payload.dest);
  }

  @Get('eta')
  async getEta(
    @Query('dLat') dLat: number,
    @Query('dLng') dLng: number,
    @Query('pLat') pLat: number,
    @Query('pLng') pLng: number,
  ) {
    return this.estimatesApplicationService.getEta(Number(dLat), Number(dLng), Number(pLat), Number(pLng));
  }
}

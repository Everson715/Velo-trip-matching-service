import { Controller, Post, Get, Patch, Param, Body, UseGuards } from '@nestjs/common';
import { RoutesApplicationService } from './routes.application.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('routes')
@UseGuards(JwtAuthGuard)
export class RoutesController {
  constructor(private readonly routesApplicationService: RoutesApplicationService) {}

  @Post('optimize')
  async optimize(@Body() payload: any) {
    return this.routesApplicationService.optimizeRoute(payload.points);
  }

  @Patch(':trip_id/re-route')
  async reRoute(@Param('trip_id') tripId: string, @Body() payload: any) {
    return this.routesApplicationService.reRoute(tripId, payload.lat, payload.lng);
  }

  @Get(':trip_id')
  async getRoute(@Param('trip_id') tripId: string) {
    return this.routesApplicationService.getRoute(tripId);
  }

  @Post('matrix')
  async matrix(@Body() payload: any) {
    return this.routesApplicationService.getMatrix(payload.origins, payload.destinations);
  }

  @Get('alternatives')
  async alternatives(@Body() payload: any) {
    return this.routesApplicationService.getAlternatives(payload.origin, payload.dest);
  }

  @Post('simulate')
  async simulate(@Body() payload: any) {
    return this.routesApplicationService.simulate(payload);
  }
}

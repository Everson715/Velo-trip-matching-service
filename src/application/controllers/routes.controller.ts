import { Controller, Post, Get, Patch, Param, Body, UseGuards } from '@nestjs/common';
import { RoutesService } from './routes.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('api/v1/routes')
@UseGuards(JwtAuthGuard)
export class RoutesController {
  constructor(private readonly routesService: RoutesService) {}

  @Post('optimize')
  async optimize(@Body() payload: any) {
    return this.routesService.optimizeRoute(payload.points);
  }

  @Patch(':trip_id/re-route')
  async reRoute(@Param('trip_id') tripId: string, @Body() payload: any) {
    return this.routesService.reRoute(tripId, payload.lat, payload.lng);
  }

  @Get(':trip_id')
  async getRoute(@Param('trip_id') tripId: string) {
    return this.routesService.getRoute(tripId);
  }

  @Post('matrix')
  async matrix(@Body() payload: any) {
    return this.routesService.getMatrix(payload.origins, payload.destinations);
  }

  @Get('alternatives')
  async alternatives(@Body() payload: any) {
    return this.routesService.getAlternatives(payload.origin, payload.dest);
  }

  @Post('simulate')
  async simulate(@Body() payload: any) {
    return this.routesService.simulate(payload);
  }
}

import { Controller, Post, Get, Patch, Body, Param } from '@nestjs/common';
import { RoutesService } from './routes.service';
import { OptimizeRouteDto, ReRouteDto, MatrixDto, SimulateRouteDto } from './dto/routes.dto';

@Controller('routes')
export class RoutesController {
  constructor(private readonly routesService: RoutesService) {}

  @Post('optimize')
  optimize(@Body() optimizeRouteDto: OptimizeRouteDto) {
    return this.routesService.optimize(optimizeRouteDto);
  }

  @Patch(':tripId/re-route')
  reRoute(@Param('tripId') tripId: string, @Body() reRouteDto: ReRouteDto) {
    return this.routesService.reRoute(tripId, reRouteDto);
  }

  @Get(':tripId')
  getRouteDetails(@Param('tripId') tripId: string) {
    return this.routesService.getRouteDetails(tripId);
  }

  @Post('matrix')
  getMatrix(@Body() matrixDto: MatrixDto) {
    return this.routesService.getMatrix(matrixDto);
  }

  @Get('alternatives')
  getAlternatives() {
    return this.routesService.getAlternatives();
  }

  @Post('simulate')
  simulate(@Body() simulateRouteDto: SimulateRouteDto) {
    return this.routesService.simulate(simulateRouteDto);
  }
}

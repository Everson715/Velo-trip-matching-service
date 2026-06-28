import { Controller, Post, Get, Body } from '@nestjs/common';
import { EstimatesService } from '../../domain/services/estimates.service';
import { EstimateRouteDto } from '../dtos/estimates.dto';

@Controller('estimates')
export class EstimatesController {
  constructor(private readonly estimatesService: EstimatesService) {}

  @Post('route')
  estimateRoute(@Body() estimateRouteDto: EstimateRouteDto) {
    return this.estimatesService.estimateRoute(estimateRouteDto);
  }

  @Get('eta')
  getEta() {
    return this.estimatesService.getEta();
  }
}

import { Injectable } from '@nestjs/common';
import { OptimizeRouteDto, ReRouteDto, MatrixDto, SimulateRouteDto } from './dto/routes.dto';

@Injectable()
export class RoutesService {
  optimize(optimizeRouteDto: OptimizeRouteDto) {
    return `This action returns optimized route`;
  }

  reRoute(tripId: string, reRouteDto: ReRouteDto) {
    return `This action re-routes trip ${tripId}`;
  }

  getRouteDetails(tripId: string) {
    return `This action returns route details for trip ${tripId}`;
  }

  getMatrix(matrixDto: MatrixDto) {
    return `This action returns matrix`;
  }

  getAlternatives() {
    return `This action returns alternatives`;
  }

  simulate(simulateRouteDto: SimulateRouteDto) {
    return `This action returns simulated route`;
  }
}

import { Injectable } from '@nestjs/common';
import { RoutingService } from '../../business/routes/routing.service';

@Injectable()
export class RoutesApplicationService {
  constructor(private readonly routingService: RoutingService) {}

  optimizeRoute(points: any[]) {
    return this.routingService.optimizeRoute(points);
  }

  reRoute(tripId: string, currentLat: number, currentLng: number) {
    return this.routingService.reRoute(tripId, currentLat, currentLng);
  }

  getRoute(tripId: string) {
    return this.routingService.getRoute(tripId);
  }

  getMatrix(origins: any[], destinations: any[]) {
    return this.routingService.getMatrix(origins, destinations);
  }

  getAlternatives(origin: any, dest: any) {
    return this.routingService.getAlternatives(origin, dest);
  }

  simulate(history: any) {
    return this.routingService.simulate(history);
  }
}

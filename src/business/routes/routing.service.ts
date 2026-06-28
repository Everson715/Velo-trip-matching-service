import { Injectable } from '@nestjs/common';

@Injectable()
export class RoutingService {
  optimizeRoute(points: any[]) {
    const distance = 15.4;
    const duration = 25;
    return { status: 'OK', points, distance, duration };
  }

  reRoute(tripId: string, _currentLat: number, _currentLng: number) {
    return { status: 'RE_ROUTED', tripId, newDistance: 12.0, newDuration: 20 };
  }

  getRoute(tripId: string) {
    return {
      tripId,
      active: true,
      path: [
        { lat: -8.1, lng: -36.1 },
        { lat: -8.2, lng: -36.2 },
      ],
    };
  }

  getMatrix(origins: any[], destinations: any[]) {
    return { origins, destinations, matrix: [[15.4, 20.0], [10.2, 5.0]] };
  }

  getAlternatives(origin: any, dest: any) {
    return { alternatives: [{ route: 'via BR-101', distance: 20, duration: 30 }] };
  }

  simulate(_history: any) {
    return { status: 'SIMULATED' };
  }
}

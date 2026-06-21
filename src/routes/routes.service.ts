import { Injectable } from '@nestjs/common';

@Injectable()
export class RoutesService {
  async optimizeRoute(points: any[]) {
    // Fallback simulado
    return { status: 'OK', points, distance: 15.4, duration: 25 };
  }

  async reRoute(tripId: string, currentLat: number, currentLng: number) {
    return { status: 'RE_ROUTED', tripId, newDistance: 12.0, newDuration: 20 };
  }

  async getRoute(tripId: string) {
    return { tripId, active: true, path: [] };
  }

  async getMatrix(origins: any[], destinations: any[]) {
    return { origins, destinations, matrix: [] };
  }

  async getAlternatives(origin: any, dest: any) {
    return { alternatives: [] };
  }

  async simulate(history: any) {
    return { status: 'SIMULATED' };
  }
}

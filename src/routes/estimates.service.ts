import { Injectable } from '@nestjs/common';

@Injectable()
export class EstimatesService {
  async estimateRoute(origin: any, dest: any) {
    return { estimated_price: 25.50, distance_km: 10, time_mins: 15 };
  }

  async getEta(driverLat: number, driverLng: number, passengerLat: number, passengerLng: number) {
    return { eta_mins: 5 };
  }
}

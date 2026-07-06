import { Injectable } from '@nestjs/common';

@Injectable()
export class EstimatesService {
  estimateRoute(_origin: any, _dest: any) {
    return { estimated_price: 25.5, distance_km: 10, time_mins: 15 };
  }

  getEta(_driverLat: number, _driverLng: number, _passengerLat: number, _passengerLng: number) {
    return { eta_mins: 5 };
  }
}

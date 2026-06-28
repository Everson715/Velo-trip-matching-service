import { Injectable } from '@nestjs/common';
import { EstimatesService } from '../../business/estimates/estimates.service';

@Injectable()
export class EstimatesApplicationService {
  constructor(private readonly estimatesService: EstimatesService) {}

  estimateRoute(origin: any, dest: any) {
    return this.estimatesService.estimateRoute(origin, dest);
  }

  getEta(driverLat: number, driverLng: number, passengerLat: number, passengerLng: number) {
    return this.estimatesService.getEta(driverLat, driverLng, passengerLat, passengerLng);
  }
}

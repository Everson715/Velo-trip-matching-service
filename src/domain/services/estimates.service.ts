import { Injectable } from '@nestjs/common';
import { EstimateRouteDto } from '../../application/dtos/estimates.dto';

@Injectable()
export class EstimatesService {
  estimateRoute(estimateRouteDto: EstimateRouteDto) {
    return 'This action estimates route';
  }

  getEta() {
    return 'This action returns ETA';
  }
}

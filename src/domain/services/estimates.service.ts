import { Injectable } from '@nestjs/common';
import { EstimateRouteDto } from './dto/estimates.dto';

@Injectable()
export class EstimatesService {
  estimateRoute(estimateRouteDto: EstimateRouteDto) {
    return 'This action estimates route';
  }

  getEta() {
    return 'This action returns ETA';
  }
}

import { EstimateRouteDto } from '../../application/dtos/estimates.dto';
export declare class EstimatesService {
    estimateRoute(estimateRouteDto: EstimateRouteDto): string;
    getEta(): string;
}

import { EstimateRouteDto } from './dto/estimates.dto';
export declare class EstimatesService {
    estimateRoute(estimateRouteDto: EstimateRouteDto): string;
    getEta(): string;
}

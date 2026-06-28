import { EstimatesService } from '../../domain/services/estimates.service';
import { EstimateRouteDto } from '../dtos/estimates.dto';
export declare class EstimatesController {
    private readonly estimatesService;
    constructor(estimatesService: EstimatesService);
    estimateRoute(estimateRouteDto: EstimateRouteDto): string;
    getEta(): string;
}

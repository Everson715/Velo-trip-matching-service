import { EstimatesService } from './estimates.service';
import { EstimateRouteDto } from './dto/estimates.dto';
export declare class EstimatesController {
    private readonly estimatesService;
    constructor(estimatesService: EstimatesService);
    estimateRoute(estimateRouteDto: EstimateRouteDto): any;
    getEta(): any;
}

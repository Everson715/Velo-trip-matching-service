import { EstimatesService } from './estimates.service';
export declare class EstimatesController {
    private readonly estimatesService;
    constructor(estimatesService: EstimatesService);
    estimateRoute(payload: any): Promise<{
        estimated_price: number;
        distance_km: number;
        time_mins: number;
    }>;
    getEta(dLat: number, dLng: number, pLat: number, pLng: number): Promise<{
        eta_mins: number;
    }>;
}

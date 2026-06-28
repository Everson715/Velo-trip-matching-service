export declare class EstimatesService {
    estimateRoute(origin: any, dest: any): Promise<{
        estimated_price: number;
        distance_km: number;
        time_mins: number;
    }>;
    getEta(driverLat: number, driverLng: number, passengerLat: number, passengerLng: number): Promise<{
        eta_mins: number;
    }>;
}

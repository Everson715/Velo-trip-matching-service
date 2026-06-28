import { CreateTripDto } from '../../application/dtos/create-trip.dto';
import { Trip } from '../entities/trip.entity';
import { IPricingRepository } from '../interfaces/pricing.repository.interface';
export declare class PricingService {
    private pricingRepository;
    constructor(pricingRepository: IPricingRepository);
    getZones(): Promise<any[]>;
    getSurge(lat: number, lng: number): Promise<{
        multiplier: number;
    }>;
    farePreview(dto: CreateTripDto): Promise<{
        min_fare: number;
        max_fare: number;
        surge_multiplier: number;
    }>;
    calculateFare(trip: Trip): Promise<{
        final_fare: number;
    }>;
    breakdown(tripId: string): Promise<{
        base: number;
        distance: number;
        time: number;
        surge: number;
        total: number;
    }>;
}

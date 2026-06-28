import { PrismaService } from '../prisma/prisma.service';
import { CreateTripDto } from '../match/dto/create-trip.dto';
import { Trip } from '@prisma/client';
export declare class PricingService {
    private prisma;
    constructor(prisma: PrismaService);
    getZones(): Promise<any>;
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

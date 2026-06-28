import { PricingService } from '../../domain/services/pricing.service';
import { PrismaService } from '../../infrastructure/database/prisma.service';
export declare class PricingController {
    private readonly pricingService;
    private readonly prisma;
    constructor(pricingService: PricingService, prisma: PrismaService);
    getZones(): Promise<any[]>;
    calculateFare(tripId: string): Promise<{
        final_fare: number;
    }>;
}

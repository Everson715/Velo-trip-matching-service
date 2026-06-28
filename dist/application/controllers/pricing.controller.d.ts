import { PricingService } from './pricing.service';
import { PrismaService } from '../prisma/prisma.service';
export declare class PricingController {
    private readonly pricingService;
    private readonly prisma;
    constructor(pricingService: PricingService, prisma: PrismaService);
    getZones(): Promise<any>;
    calculateFare(tripId: string): Promise<any>;
}

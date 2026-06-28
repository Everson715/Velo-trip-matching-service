import { PrismaService } from '../prisma.service';
import { IPricingRepository } from '../../../domain/interfaces/pricing.repository.interface';
export declare class PrismaPricingRepository implements IPricingRepository {
    private prisma;
    constructor(prisma: PrismaService);
    findActiveZones(): Promise<any[]>;
    findById(tripId: string): Promise<any | null>;
}

import { PrismaService } from '../prisma.service';
import { ITripRepository } from '../../../domain/interfaces/trip.repository.interface';
import { Trip, TripStatus } from '../../../domain/entities/trip.entity';
export declare class PrismaTripRepository implements ITripRepository {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: Partial<Trip>): Promise<Trip>;
    findById(id: string): Promise<Trip | null>;
    findAvailableTrips(): Promise<Trip[]>;
    update(id: string, data: Partial<Trip>): Promise<Trip>;
    assignDriverOptimistic(tripId: string, driverId: string): Promise<Trip | null>;
    updateStatusSafe(tripId: string, oldStatus: TripStatus, newStatus: TripStatus, data?: Partial<Trip>): Promise<Trip | null>;
}

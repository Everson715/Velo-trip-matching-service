import { Trip, TripStatus } from '../entities/trip.entity';

export const I_TRIP_REPOSITORY = 'ITripRepository';

export interface ITripRepository {
  create(data: Partial<Trip>): Promise<Trip>;
  findById(id: string): Promise<Trip | null>;
  findAvailableTrips(): Promise<Trip[]>;
  update(id: string, data: Partial<Trip>): Promise<Trip>;
  assignDriverOptimistic(tripId: string, driverId: string): Promise<Trip | null>;
}

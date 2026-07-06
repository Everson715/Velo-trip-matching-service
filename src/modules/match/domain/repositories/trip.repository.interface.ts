import { Trip } from '../entities/trip.entity';

export const TRIP_REPOSITORY_TOKEN = Symbol('TRIP_REPOSITORY_TOKEN');

export interface ITripRepository {
  findById(tripId: string): Promise<Trip | null>;
  save(trip: Trip): Promise<Trip>;
  findSearchingTrips(): Promise<Trip[]>;
  create(data: {
    passenger_id: string;
    origin_lat: number;
    origin_lng: number;
    dest_lat: number;
    dest_lng: number;
    estimated_price: number;
  }): Promise<Trip>;
}

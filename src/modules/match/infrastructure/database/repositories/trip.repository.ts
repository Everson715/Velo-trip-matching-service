import { Injectable } from '@nestjs/common';
import { Prisma, TripStatus, Trip as PrismaTrip } from '@prisma/client';
import { PrismaService } from '../../../../shared/infrastructure/database/prisma/prisma.service';
import { ITripRepository } from '../../../domain/repositories/trip.repository.interface';
import { Trip } from '../../../domain/entities/trip.entity';

@Injectable()
export class TripRepository implements ITripRepository {
  constructor(private readonly prisma: PrismaService) {}

  private mapToDomain(prismaTrip: PrismaTrip): Trip {
    return new Trip(
      prismaTrip.id,
      prismaTrip.passenger_id,
      prismaTrip.driver_id,
      prismaTrip.status,
      prismaTrip.origin_lat,
      prismaTrip.origin_lng,
      prismaTrip.dest_lat,
      prismaTrip.dest_lng,
      Number(prismaTrip.estimated_price),
      prismaTrip.final_price ? Number(prismaTrip.final_price) : null,
      prismaTrip.created_at,
      prismaTrip.updated_at,
    );
  }

  async create(data: {
    passenger_id: string;
    origin_lat: number;
    origin_lng: number;
    dest_lat: number;
    dest_lng: number;
    estimated_price: number;
  }): Promise<Trip> {
    const created = await this.prisma.trip.create({
      data: {
        ...data,
        status: TripStatus.SEARCHING,
      },
    });
    return this.mapToDomain(created);
  }

  async findById(tripId: string): Promise<Trip | null> {
    const trip = await this.prisma.trip.findUnique({ where: { id: tripId } });
    if (!trip) return null;
    return this.mapToDomain(trip);
  }

  async findSearchingTrips(): Promise<Trip[]> {
    const trips = await this.prisma.trip.findMany({
      where: { status: TripStatus.SEARCHING },
    });
    return trips.map(t => this.mapToDomain(t));
  }

  async acceptTrip(tripId: string, driverId: string): Promise<number> {
    const result = await this.prisma.trip.updateMany({
      where: { id: tripId, status: TripStatus.SEARCHING },
      data: { status: TripStatus.MATCHED, driver_id: driverId },
    });
    return result.count;
  }

  // The save method as part of standard DDD pattern:
  async save(trip: Trip): Promise<Trip> {
    const updated = await this.prisma.trip.update({
      where: { id: trip.id },
      data: {
        status: trip.status as TripStatus,
        driver_id: trip.driverId,
        final_price: trip.finalPrice,
        updated_at: trip.updatedAt
      }
    });
    return this.mapToDomain(updated);
  }

  runInTransaction<T>(fn: (tx: Prisma.TransactionClient) => Promise<T>): Promise<T> {
    return this.prisma.$transaction(fn);
  }

  async findByIdWithTx(tx: Prisma.TransactionClient, tripId: string): Promise<Trip | null> {
    const trip = await tx.trip.findUnique({ where: { id: tripId } });
    if (!trip) return null;
    return this.mapToDomain(trip);
  }

  async updateStatusWithTx(
    tx: Prisma.TransactionClient,
    tripId: string,
    status: TripStatus,
    finalPrice?: number,
  ): Promise<Trip> {
    const updated = await tx.trip.update({
      where: { id: tripId },
      data: {
        status,
        ...(finalPrice !== undefined ? { final_price: finalPrice } : {}),
      },
    });
    return this.mapToDomain(updated);
  }
}

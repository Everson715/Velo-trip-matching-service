import { Injectable } from '@nestjs/common';
import { Prisma, Trip, TripStatus } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TripRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(data: {
    passenger_id: string;
    origin_lat: number;
    origin_lng: number;
    dest_lat: number;
    dest_lng: number;
    estimated_price: number;
  }): Promise<Trip> {
    return this.prisma.trip.create({
      data: {
        ...data,
        status: TripStatus.SEARCHING,
      },
    });
  }

  findById(tripId: string): Promise<Trip | null> {
    return this.prisma.trip.findUnique({ where: { id: tripId } });
  }

  findSearchingTrips(): Promise<Trip[]> {
    return this.prisma.trip.findMany({
      where: { status: TripStatus.SEARCHING },
    });
  }

  acceptTrip(tripId: string, driverId: string): Promise<number> {
    return this.prisma.trip
      .updateMany({
        where: { id: tripId, status: TripStatus.SEARCHING },
        data: { status: TripStatus.MATCHED, driver_id: driverId },
      })
      .then((result) => result.count);
  }

  runInTransaction<T>(fn: (tx: Prisma.TransactionClient) => Promise<T>): Promise<T> {
    return this.prisma.$transaction(fn);
  }

  findByIdWithTx(tx: Prisma.TransactionClient, tripId: string): Promise<Trip | null> {
    return tx.trip.findUnique({ where: { id: tripId } });
  }

  updateStatusWithTx(
    tx: Prisma.TransactionClient,
    tripId: string,
    status: TripStatus,
    finalPrice?: number,
  ): Promise<Trip> {
    return tx.trip.update({
      where: { id: tripId },
      data: {
        status,
        ...(finalPrice !== undefined ? { final_price: finalPrice } : {}),
      },
    });
  }
}

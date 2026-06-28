import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { ITripRepository } from '../../../domain/interfaces/trip.repository.interface';
import { Trip, TripStatus } from '../../../domain/entities/trip.entity';
import { TripStatus as PrismaTripStatus } from '@prisma/client';

@Injectable()
export class PrismaTripRepository implements ITripRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: Partial<Trip>): Promise<Trip> {
    return this.prisma.trip.create({
      data: {
        ...data,
        status: data.status as unknown as PrismaTripStatus,
      } as any,
    }) as unknown as Trip;
  }

  async findById(id: string): Promise<Trip | null> {
    const trip = await this.prisma.trip.findUnique({ where: { id } });
    return trip as unknown as Trip;
  }

  async findAvailableTrips(): Promise<Trip[]> {
    const trips = await this.prisma.trip.findMany({
      where: { status: PrismaTripStatus.SEARCHING },
    });
    return trips as unknown as Trip[];
  }

  async update(id: string, data: Partial<Trip>): Promise<Trip> {
    const trip = await this.prisma.trip.update({
      where: { id },
      data: {
        ...data,
        status: data.status ? (data.status as unknown as PrismaTripStatus) : undefined,
      } as any,
    });
    return trip as unknown as Trip;
  }

  async assignDriverOptimistic(tripId: string, driverId: string): Promise<Trip | null> {
    const result = await this.prisma.trip.updateMany({
      where: { id: tripId, status: PrismaTripStatus.SEARCHING },
      data: { status: PrismaTripStatus.MATCHED, driver_id: String(driverId) },
    });

    if (result.count === 0) return null;
    return this.findById(tripId);
  }
}

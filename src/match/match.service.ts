import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { RequestMatchDto, AcceptMatchDto, DeclineMatchDto } from './dto/match.dto';
import { PrismaService } from '../prisma/prisma.service';
import { TripStatus } from '@prisma/client';

@Injectable()
export class MatchService {
  constructor(private readonly prisma: PrismaService) {}

  async requestMatch(dto: RequestMatchDto) {
    const existingTrip = await this.prisma.trip.findFirst({
      where: {
        passengerId: dto.passengerId,
        status: { in: [TripStatus.SEARCHING, TripStatus.MATCHED] },
      },
    });

    if (existingTrip) {
      throw new BadRequestException('Passenger already has an active trip');
    }

    return this.prisma.trip.create({
      data: {
        passengerId: dto.passengerId,
        originLatitude: dto.originLatitude,
        originLongitude: dto.originLongitude,
        destinationLatitude: dto.destinationLatitude,
        destinationLongitude: dto.destinationLongitude,
        price: dto.price,
        status: TripStatus.SEARCHING,
      },
    });
  }

  async getStatus(tripId: string) {
    const trip = await this.prisma.trip.findUnique({ where: { id: tripId } });
    if (!trip) throw new NotFoundException('Trip not found');
    return trip;
  }

  async cancelMatch(tripId: string) {
    const trip = await this.prisma.trip.findUnique({ where: { id: tripId } });
    if (!trip) throw new NotFoundException('Trip not found');
    return this.prisma.trip.update({
      where: { id: tripId },
      data: { status: TripStatus.CANCELLED },
    });
  }

  async getAvailableTrips() {
    return this.prisma.trip.findMany({ where: { status: TripStatus.SEARCHING } });
  }

  async acceptMatch(dto: AcceptMatchDto) {
    const trip = await this.prisma.trip.findUnique({ where: { id: dto.tripId } });
    if (!trip) throw new NotFoundException('Trip not found');

    if (trip.status !== TripStatus.SEARCHING) {
      throw new BadRequestException('Trip is not available for matching');
    }

    return this.prisma.trip.update({
      where: { id: dto.tripId },
      data: { status: TripStatus.MATCHED, driverId: dto.driverId },
    });
  }

  async declineMatch(dto: DeclineMatchDto) {
    const trip = await this.prisma.trip.findUnique({ where: { id: dto.tripId } });
    if (!trip) throw new NotFoundException('Trip not found');

    if (trip.driverId === dto.driverId) {
      return this.prisma.trip.update({
        where: { id: dto.tripId },
        data: { status: TripStatus.SEARCHING, driverId: null },
      });
    }
    return trip;
  }

  async arrive(tripId: string) {
    const trip = await this.prisma.trip.findUnique({ where: { id: tripId } });
    if (!trip) throw new NotFoundException('Trip not found');
    if (trip.status !== TripStatus.MATCHED) throw new BadRequestException('Invalid trip status');

    return this.prisma.trip.update({
      where: { id: tripId },
      data: { status: TripStatus.ARRIVED },
    });
  }

  async startTrip(tripId: string) {
    const trip = await this.prisma.trip.findUnique({ where: { id: tripId } });
    if (!trip) throw new NotFoundException('Trip not found');
    if (trip.status !== TripStatus.ARRIVED && trip.status !== TripStatus.MATCHED) {
      throw new BadRequestException('Trip must be MATCHED or ARRIVED to start');
    }

    return this.prisma.trip.update({
      where: { id: tripId },
      data: { status: TripStatus.IN_PROGRESS },
    });
  }

  async completeTrip(tripId: string) {
    const trip = await this.prisma.trip.findUnique({ where: { id: tripId } });
    if (!trip) throw new NotFoundException('Trip not found');
    if (trip.status !== TripStatus.IN_PROGRESS) {
      throw new BadRequestException('Trip is not in progress');
    }

    return this.prisma.trip.update({
      where: { id: tripId },
      data: { status: TripStatus.COMPLETED },
    });
  }
}

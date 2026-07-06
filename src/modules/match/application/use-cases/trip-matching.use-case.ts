import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { Trip, TripStatus } from '@prisma/client';

@Injectable()
export class TripMatchingService {
  assertPassengerOwnership(trip: Trip, passengerId: string): void {
    if (trip.passenger_id !== String(passengerId)) {
      throw new ForbiddenException('IDOR: Not your trip');
    }
  }

  assertDriverOwnership(trip: Trip, driverId: string): void {
    if (trip.driver_id !== String(driverId)) {
      throw new ForbiddenException('IDOR: Not your assigned trip');
    }
  }

  assertCanCancel(trip: Trip): void {
    if (trip.status !== TripStatus.SEARCHING && trip.status !== TripStatus.MATCHED) {
      throw new BadRequestException('Cannot cancel trip at this stage');
    }
  }

  assertCanArrive(trip: Trip): void {
    if (trip.status !== TripStatus.MATCHED) {
      throw new BadRequestException('Invalid state transition. Must be MATCHED.');
    }
  }

  assertCanStart(trip: Trip): void {
    if (trip.status !== TripStatus.ARRIVED) {
      throw new BadRequestException('Invalid state transition. Must be ARRIVED.');
    }
  }

  assertCanComplete(trip: Trip): void {
    if (trip.status !== TripStatus.IN_PROGRESS) {
      throw new BadRequestException('Invalid state transition. Must be IN_PROGRESS.');
    }
  }
}

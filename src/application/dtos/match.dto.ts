import { IsUUID, IsNotEmpty, IsNumber } from 'class-validator';

export class RequestMatchDto {
  @IsUUID()
  @IsNotEmpty()
  passengerId: string;

  @IsNumber()
  @IsNotEmpty()
  originLatitude: number;

  @IsNumber()
  @IsNotEmpty()
  originLongitude: number;

  @IsNumber()
  @IsNotEmpty()
  destinationLatitude: number;

  @IsNumber()
  @IsNotEmpty()
  destinationLongitude: number;

  @IsNumber()
  @IsNotEmpty()
  price: number;
}

export class AcceptMatchDto {
  @IsUUID()
  @IsNotEmpty()
  tripId: string;
}

export class DeclineMatchDto {
  @IsUUID()
  @IsNotEmpty()
  tripId: string;
}

export class TripActionDto {
  @IsUUID()
  @IsNotEmpty()
  tripId: string;
}
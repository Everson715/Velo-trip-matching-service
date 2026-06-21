import { IsUUID, IsNumber, IsEnum, IsOptional } from 'class-validator';
import { TripStatus } from '@prisma/client';

export class CreateTripDto {
  @IsNumber()
  origin_lat: number;

  @IsNumber()
  origin_lng: number;

  @IsNumber()
  dest_lat: number;

  @IsNumber()
  dest_lng: number;

  @IsNumber()
  estimated_price: number;
}

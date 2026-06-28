import { IsNumber, Min, Max, IsNotEmpty } from 'class-validator';

export class CreateTripDto {
  @IsNumber()
  @Min(-90)
  @Max(90)
  origin_lat: number;

  @IsNumber()
  @Min(-180)
  @Max(180)
  origin_lng: number;

  @IsNumber()
  @Min(-90)
  @Max(90)
  dest_lat: number;

  @IsNumber()
  @Min(-180)
  @Max(180)
  dest_lng: number;

  @IsNumber()
  @IsNotEmpty()
  estimated_price: number;
}

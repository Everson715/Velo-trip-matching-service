import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class FarePreviewDto {
  @IsNumber()
  @IsNotEmpty()
  distanceKm: number;

  @IsNumber()
  @IsNotEmpty()
  timeMinutes: number;

  @IsString()
  @IsNotEmpty()
  zone: string;
}

export class CalculateFareDto {
  @IsNumber()
  @IsNotEmpty()
  distanceKm: number;

  @IsNumber()
  @IsNotEmpty()
  timeMinutes: number;

  @IsString()
  @IsNotEmpty()
  zone: string;
}

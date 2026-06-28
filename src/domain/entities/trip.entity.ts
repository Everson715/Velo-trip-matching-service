export enum TripStatus {
  SEARCHING = 'SEARCHING',
  MATCHED = 'MATCHED',
  ARRIVED = 'ARRIVED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED'
}

export class Trip {
  id: string;
  passenger_id: string;
  driver_id?: string | null;
  origin_lat: number;
  origin_lng: number;
  dest_lat: number;
  dest_lng: number;
  status: TripStatus;
  estimated_price: number | null;
  final_price: number | null;
}

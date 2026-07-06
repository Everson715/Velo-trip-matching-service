export class Trip {
  constructor(
    public readonly id: string,
    public readonly passengerId: string,
    public driverId: string | null,
    public status: string,
    public originLat: number,
    public originLng: number,
    public destLat: number,
    public destLng: number,
    public estimatedPrice: number,
    public finalPrice: number | null,
    public readonly createdAt: Date,
    public updatedAt: Date,
  ) {}

  public assignDriver(driverId: string): void {
    if (this.status !== 'SEARCHING') {
      throw new Error('Trip is not in SEARCHING state');
    }
    this.driverId = driverId;
    this.status = 'MATCHED';
    this.updatedAt = new Date();
  }

  public complete(finalPrice: number): void {
    if (this.status !== 'IN_PROGRESS') {
      throw new Error('Trip must be IN_PROGRESS to complete');
    }
    this.finalPrice = finalPrice;
    this.status = 'COMPLETED';
    this.updatedAt = new Date();
  }
}

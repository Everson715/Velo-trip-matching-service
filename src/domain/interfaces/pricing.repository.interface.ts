export const I_PRICING_REPOSITORY = 'IPricingRepository';

export interface IPricingRepository {
  findActiveZones(): Promise<any[]>;
  findById(tripId: string): Promise<any | null>;
}

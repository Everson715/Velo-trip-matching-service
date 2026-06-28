import { Test, TestingModule } from '@nestjs/testing';
import { PricingApplicationService } from './pricing.application.service';
import { PricingService } from '../../business/pricing/pricing.service';
import { TripRepository } from '../../infrastructure/database/repositories/trip.repository';
import { PricingZoneRepository } from '../../infrastructure/database/repositories/pricing-zone.repository';

describe('PricingApplicationService', () => {
  let service: PricingApplicationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PricingApplicationService,
        PricingService,
        {
          provide: TripRepository,
          useValue: { findById: jest.fn() },
        },
        {
          provide: PricingZoneRepository,
          useValue: { findActiveZones: jest.fn() },
        },
      ],
    }).compile();

    service = module.get<PricingApplicationService>(PricingApplicationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

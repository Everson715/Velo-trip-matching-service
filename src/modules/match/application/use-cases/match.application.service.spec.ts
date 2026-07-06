import { Test, TestingModule } from '@nestjs/testing';
import { MatchApplicationService } from './match.application.service';
import { TripRepository } from '../../infrastructure/database/repositories/trip.repository';
import { TripMatchingService } from '../../business/match/trip-matching.service';
import { PricingService } from '../../business/pricing/pricing.service';

describe('MatchApplicationService', () => {
  let service: MatchApplicationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MatchApplicationService,
        TripMatchingService,
        PricingService,
        {
          provide: TripRepository,
          useValue: {
            create: jest.fn(),
            findById: jest.fn(),
            findSearchingTrips: jest.fn(),
            acceptTrip: jest.fn(),
            runInTransaction: jest.fn(),
            findByIdWithTx: jest.fn(),
            updateStatusWithTx: jest.fn(),
          },
        },
        {
          provide: 'PAYMENT_INTEGRATION_CLIENT',
          useValue: { capturePayment: jest.fn() },
        },
      ],
    }).compile();

    service = module.get<MatchApplicationService>(MatchApplicationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

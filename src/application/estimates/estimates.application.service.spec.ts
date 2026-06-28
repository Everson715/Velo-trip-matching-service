import { Test, TestingModule } from '@nestjs/testing';
import { EstimatesApplicationService } from './estimates.application.service';
import { EstimatesService } from '../../business/estimates/estimates.service';

describe('EstimatesApplicationService', () => {
  let service: EstimatesApplicationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EstimatesApplicationService, EstimatesService],
    }).compile();

    service = module.get<EstimatesApplicationService>(EstimatesApplicationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

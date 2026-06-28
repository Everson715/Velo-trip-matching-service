import { Test, TestingModule } from '@nestjs/testing';
import { RoutesApplicationService } from './routes.application.service';
import { RoutingService } from '../../business/routes/routing.service';

describe('RoutesApplicationService', () => {
  let service: RoutesApplicationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RoutesApplicationService, RoutingService],
    }).compile();

    service = module.get<RoutesApplicationService>(RoutesApplicationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

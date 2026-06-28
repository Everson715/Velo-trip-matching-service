import { Module } from '@nestjs/common';
import { EstimatesController } from '../application/controllers/estimates.controller';
import { EstimatesService } from '../domain/services/estimates.service';

@Module({
  controllers: [EstimatesController],
  providers: [EstimatesService]
})
export class EstimatesModule {}

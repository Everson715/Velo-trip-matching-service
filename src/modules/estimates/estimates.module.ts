import { Module } from '@nestjs/common';
import { EstimatesApplicationService } from './estimates.application.service';
import { EstimatesController } from './estimates.controller';
import { BusinessModule } from '../../business/business.module';

@Module({
  imports: [BusinessModule],
  controllers: [EstimatesController],
  providers: [EstimatesApplicationService],
})
export class EstimatesModule {}

import { Module } from '@nestjs/common';
import { PricingApplicationService } from './pricing.application.service';
import { PricingController } from './pricing.controller';
import { InfrastructureModule } from '../../infrastructure/infrastructure.module';
import { BusinessModule } from '../../business/business.module';

@Module({
  imports: [InfrastructureModule, BusinessModule],
  controllers: [PricingController],
  providers: [PricingApplicationService],
  exports: [PricingApplicationService],
})
export class PricingModule {}

import { Module } from '@nestjs/common';
import { RoutesApplicationService } from './routes.application.service';
import { RoutesController } from './routes.controller';
import { BusinessModule } from '../../business/business.module';
import { InfrastructureModule } from '../../infrastructure/infrastructure.module';

@Module({
  imports: [InfrastructureModule, BusinessModule],
  controllers: [RoutesController],
  providers: [RoutesApplicationService],
})
export class RoutesModule {}

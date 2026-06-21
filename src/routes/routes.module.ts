import { Module } from '@nestjs/common';
import { RoutesService } from './routes.service';
import { RoutesController } from './routes.controller';
import { EstimatesService } from './estimates.service';
import { EstimatesController } from './estimates.controller';

@Module({
  controllers: [RoutesController, EstimatesController],
  providers: [RoutesService, EstimatesService],
})
export class RoutesModule {}

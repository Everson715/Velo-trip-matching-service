import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { PrismaModule } from './database/prisma/prisma.module';
import { TripRepository } from './database/repositories/trip.repository';
import { PricingZoneRepository } from './database/repositories/pricing-zone.repository';
import { PaymentIntegrationClient } from './external/payment/payment.client';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [PrismaModule, HttpModule, AuthModule],
  providers: [TripRepository, PricingZoneRepository, PaymentIntegrationClient],
  exports: [
    PrismaModule,
    AuthModule,
    TripRepository,
    PricingZoneRepository,
    PaymentIntegrationClient,
  ],
})
export class InfrastructureModule {}

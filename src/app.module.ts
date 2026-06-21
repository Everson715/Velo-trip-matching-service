import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { MatchModule } from './match/match.module';
import { RoutesModule } from './routes/routes.module';
import { PricingModule } from './pricing/pricing.module';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    MatchModule,
    RoutesModule,
    PricingModule
  ],
})
export class AppModule {}

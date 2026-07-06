import { Module } from '@nestjs/common';
import { MatchApplicationService } from './application/use-cases/match.application.service';
import { MatchController } from './infrastructure/http/controllers/match.controller';
import { TripMatchingService } from './application/use-cases/trip-matching.use-case';
import { TripRepository } from './infrastructure/database/repositories/trip.repository';
import { TRIP_REPOSITORY_TOKEN } from './domain/repositories/trip.repository.interface';
import { PrismaService } from '../../shared/infrastructure/database/prisma/prisma.service';

@Module({
  imports: [], // Outros módulos podem ser importados aqui
  controllers: [MatchController],
  providers: [
    PrismaService,
    TripMatchingService,
    MatchApplicationService,
    {
      provide: TRIP_REPOSITORY_TOKEN, // <-- A MÁGICA DA INVERSÃO DE DEPENDÊNCIA AQUI
      useClass: TripRepository,       // NestJS vai injetar a classe de Infraestrutura quando pedirem a Interface de Domínio
    },
    // { provide: 'PAYMENT_INTEGRATION_CLIENT', useExisting: PaymentIntegrationClient } - Omitido p/ brevidade
  ],
})
export class MatchModule {}

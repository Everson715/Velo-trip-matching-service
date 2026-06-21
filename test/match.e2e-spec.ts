import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import * as request from 'supertest';
import { randomUUID } from 'crypto';
import { AppModule } from './../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';
import { JwtAuthGuard } from '../src/auth/jwt-auth.guard';
import { TripStatus } from '@prisma/client';

/**
 * MockJwtAuthGuard: Helper Guard para simular tokens JWT nos testes E2E.
 * Ele espera receber um token que seja apenas um payload codificado em base64.
 * Isso permite testar roles e identity sem depender de um servidor de autenticação externo (JWKS).
 */
class MockJwtAuthGuard {
  canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];
      try {
        const payload = JSON.parse(Buffer.from(token, 'base64').toString('utf-8'));
        req.user = payload;
        // Mapeia 'sub' para 'userId' da mesma forma que o JwtStrategy original
        if (req.user.sub) {
          req.user.userId = String(req.user.sub);
        }
        return true;
      } catch (e) {
        throw new UnauthorizedException('Token inválido');
      }
    }
    throw new UnauthorizedException('Sem token ou token inválido'); // falha a autenticação com 401
  }
}

/**
 * Utilitário para gerar um token mock codificado em base64 com sub e role.
 */
const generateAuthToken = (sub: string, role: string) => {
  const payload = {
    sub,
    roles: [role],
  };
  return `Bearer ${Buffer.from(JSON.stringify(payload)).toString('base64')}`;
};
  const mockpaymentClient = {
    capturePayment: jest.fn().mockResolvedValue({status: 'success'}),
  }
describe('MatchController (e2e)- Avançado)',() => {
    describe('POST /match/request (Validações)', () => {

    it('deve retornar 400 se as coordenadas estiverem fora do intervalo', async () => {

      await request(app.getHttpServer())
        .post('/api/v1/match/request')
        .set('Authorization', passengerToken)
        .send({
          origin_lat: 1000,
          origin_lng: -36.4,
          dest_lat: -8.1,
          dest_lng: -36.4,
          estimated_price: 25.5,
        })
        .expect(400);

    });

  });
  let app: INestApplication;
  let prisma: PrismaService;

  // Tokens pré-gerados para os atores do sistema
  const passengerToken = generateAuthToken('passenger-123', 'passenger');
  const driverToken = generateAuthToken('driver-456', 'driver');

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      // Substitui o guard original de validação de JWT pelo nosso mock local
      .overrideGuard(JwtAuthGuard).useClass(MockJwtAuthGuard)
      .overrideProvider('PAYMENT_INTEGRATION_CLIENT').useValue(mockpaymentClient)
      .compile();

    app = moduleFixture.createNestApplication();
    app.setGlobalPrefix('api/v1'); // Mesmo prefixo que costuma estar no main.ts
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
    await app.init();

    // Obtém a instância real do Prisma para manipularmos o banco
    prisma = app.get<PrismaService>(PrismaService);
  });

  afterAll(async () => {
    // Desconecta do banco de dados e fecha a aplicação após execução de tudo
    await prisma.$disconnect();
    await app.close();
  });

  beforeEach(async () => {
    // IMPORTANTE: Limpa a tabela de viagens antes de CADA teste para evitar colisões
    await prisma.trip.deleteMany();
  });

  describe('POST /api/v1/match/request', () => {
    it('deve criar uma corrida com sucesso (Status inicial: SEARCHING) e retornar 201', async () => {
      const createTripDto = {
        origin_lat: -8.1123,
        origin_lng: -36.4123,
        dest_lat: -8.1234,
        dest_lng: -36.4234,
        estimated_price: 25.50,
      };

      const response = await request(app.getHttpServer())
        .post('/api/v1/match/request')
        .set('Authorization', passengerToken)
        .send(createTripDto)
        .expect(201);

      // Verificações na Resposta HTTP
      expect(response.body).toHaveProperty('id');
      expect(response.body.status).toBe(TripStatus.SEARCHING);
      expect(response.body.passenger_id).toBe('passenger-123');
      expect(Number(response.body.estimated_price)).toBe(25.50);

      // Verificação de Integração - O registro realmente foi persistido no banco de dados?
      const tripInDb = await prisma.trip.findUnique({
        where: { id: response.body.id },
      });
      expect(tripInDb).toBeDefined();
      expect(tripInDb?.status).toBe(TripStatus.SEARCHING);
      expect(tripInDb?.passenger_id).toBe('passenger-123');
    });

    it('deve falhar com 400 Bad Request ao enviar payload incompleto (falha de validação DTO)', async () => {
      const invalidDto = { origin_lat: -8.1123 }; // Faltam origin_lng, dest_lat, dest_lng, estimated_price

      await request(app.getHttpServer())
        .post('/api/v1/match/request')
        .set('Authorization', passengerToken)
        .send(invalidDto)
        .expect(400);
    });

    it('deve falhar com 401 Unauthorized se o token não for enviado', async () => {
      const createTripDto = {
        origin_lat: -8.1123, origin_lng: -36.4123,
        dest_lat: -8.1234, dest_lng: -36.4234,
        estimated_price: 25.50,
      };

      await request(app.getHttpServer())
        .post('/api/v1/match/request')
        // Sem .set('Authorization')
        .send(createTripDto)
        .expect(401);
    });

    it('deve falhar com 403 Forbidden se um motorista tentar requisitar viagem (apenas passenger)', async () => {
      const createTripDto = {
        origin_lat: -8.1123, origin_lng: -36.4123,
        dest_lat: -8.1234, dest_lng: -36.4234,
        estimated_price: 25.50,
      };

      await request(app.getHttpServer())
        .post('/api/v1/match/request')
        .set('Authorization', driverToken) // Token do motorista, role driver
        .send(createTripDto)
        .expect(403);
    });
  });

  describe('GET /api/v1/match/status/:trip_id', () => {
    it('deve retornar os detalhes e o status de uma corrida existente', async () => {
      const trip = await prisma.trip.create({
        data: {
          passenger_id: 'passenger-123',
          origin_lat: -8.1, origin_lng: -36.1,
          dest_lat: -8.2, dest_lng: -36.2,
          estimated_price: 20.0,
          status: TripStatus.SEARCHING,
        },
      });

      const response = await request(app.getHttpServer())
        .get(`/api/v1/match/status/${trip.id}`)
        .set('Authorization', passengerToken)
        .expect(200);

      expect(response.body.id).toBe(trip.id);
      expect(response.body.status).toBe(TripStatus.SEARCHING);
    });

    it('deve retornar 404 Not Found se a corrida não existir', async () => {
      const fakeId = randomUUID();
      await request(app.getHttpServer())
        .get(`/api/v1/match/status/${fakeId}`)
        .set('Authorization', passengerToken)
        .expect(404);
    });
  });

  describe('DELETE /api/v1/match/cancel/:trip_id', () => {
    it('deve cancelar uma corrida pendente (alterar para CANCELLED ou deletar banco dependendo da logica)', async () => {
      const trip = await prisma.trip.create({
        data: {
          passenger_id: 'passenger-123',
          origin_lat: -8.1, origin_lng: -36.1,
          dest_lat: -8.2, dest_lng: -36.2,
          estimated_price: 20.0,
          status: TripStatus.SEARCHING,
        },
      });

      await request(app.getHttpServer())
        .delete(`/api/v1/match/cancel/${trip.id}`)
        .set('Authorization', passengerToken)
        .expect(200);

      // Verificação no BD para confirmar o cancelamento
      const tripInDb = await prisma.trip.findUnique({
        where: { id: trip.id },
      });
      // Geralmente a trip é mantida para histórico com status cancelado
      if (tripInDb) {
        expect(tripInDb.status).toBe('CANCELLED');
      }
    });
  });

  describe('GET /api/v1/match/available-trips', () => {
    it('deve retornar a lista de viagens com status SEARCHING para o motorista', async () => {
      await prisma.trip.create({
        data: {
          passenger_id: 'passenger-123',
          origin_lat: -8.1, origin_lng: -36.1,
          dest_lat: -8.2, dest_lng: -36.2,
          estimated_price: 20.0,
          status: TripStatus.SEARCHING,
        },
      });

      const response = await request(app.getHttpServer())
        .get('/api/v1/match/available-trips?lat=-8.1&lng=-36.1')
        .set('Authorization', driverToken)
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThan(0);
      expect(response.body[0].status).toBe(TripStatus.SEARCHING);
    });
  });

  describe('POST /api/v1/match/accept', () => {
    it('motorista deve aceitar uma viagem (atualizar driver_id e mudar status para MATCHED)', async () => {
      const trip = await prisma.trip.create({
        data: {
          passenger_id: 'passenger-123',
          origin_lat: -8.1, origin_lng: -36.1,
          dest_lat: -8.2, dest_lng: -36.2,
          estimated_price: 20.0,
          status: TripStatus.SEARCHING,
        },
      });

      await request(app.getHttpServer())
        .post('/api/v1/match/accept')
        .set('Authorization', driverToken)
        .send({ tripId: trip.id })
        .expect(201);

      const tripInDb = await prisma.trip.findUnique({
        where: { id: trip.id },
      });
      
      expect(tripInDb?.status).toBe(TripStatus.MATCHED); // TripStatus.MATCHED
      expect(tripInDb?.driver_id).toBe('driver-456');
    });
  });

  describe('PATCH - Ações de Corrida do Motorista', () => {
    let tripId: string;

    beforeEach(async () => {
      // Cria uma viagem aceita previamente para testar o fluxo subsequente
      const trip = await prisma.trip.create({
        data: {
          passenger_id: 'passenger-123',
          driver_id: 'driver-456',
          origin_lat: -8.1, origin_lng: -36.1,
          dest_lat: -8.2, dest_lng: -36.2,
          estimated_price: 20.0,
          status: TripStatus.MATCHED,
        },
      });
      tripId = trip.id;
    });

    it('PATCH /api/v1/match/trip/:trip_id/arrive -> deve marcar a chegada do motorista (ARRIVED)', async () => {
      await request(app.getHttpServer())
        .patch(`/api/v1/match/trip/${tripId}/arrive`)
        .set('Authorization', driverToken)
        .expect(200);

      const tripInDb = await prisma.trip.findUnique({ where: { id: tripId } });
      expect(tripInDb?.status).toBe(TripStatus.ARRIVED); 
    });

    it('PATCH /api/v1/match/trip/:trip_id/start -> deve iniciar a corrida (IN_PROGRESS)', async () => {
      // Prepara o banco para ARRIVED antes
      await prisma.trip.update({ where: { id: tripId }, data: { status: TripStatus.ARRIVED}});
      
      await request(app.getHttpServer())
        .patch(`/api/v1/match/trip/${tripId}/start`)
        .set('Authorization', driverToken)
        .expect(200);

      const tripInDb = await prisma.trip.findUnique({ where: { id: tripId } });
      expect(tripInDb?.status).toBe(TripStatus.IN_PROGRESS);
    });

    it('PATCH /api/v1/match/trip/:trip_id/complete -> deve finalizar a corrida (COMPLETED)', async () => {
      // Prepara o banco para IN_PROGRESS antes
      await prisma.trip.update({ where: { id: tripId }, data: { status: TripStatus.IN_PROGRESS }});

      await request(app.getHttpServer())
        .patch(`/api/v1/match/trip/${tripId}/complete`)
        .set('Authorization', driverToken)
        .expect(200);
        expect(mockpaymentClient.capturePayment).toHaveBeenCalledWith(tripId, expect.any(Number), 'passenger-123');

      const tripInDb = await prisma.trip.findUnique({ where: { id: tripId } });
      expect(tripInDb?.status).toBe(TripStatus.COMPLETED);
    });
  });
});

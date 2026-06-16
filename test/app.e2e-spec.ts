import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';
import { TripStatus } from '@prisma/client';

describe('Velo Trip Matching Service (e2e)', () => {
  let app: INestApplication<App>;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(PrismaService)
      .useValue({
        trip: {
          findFirst: jest.fn(),
          create: jest.fn(),
          findUnique: jest.fn(),
          update: jest.fn(),
        },
      })
      .compile();

    app = moduleFixture.createNestApplication();
    app.setGlobalPrefix('api/v1');
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
    await app.init();

    prismaService = moduleFixture.get<PrismaService>(PrismaService);
  });

  afterEach(async () => {
    await app.close();
  });

  describe('MatchController', () => {
    it('POST /api/v1/match/request - should return 201', async () => {
      (prismaService.trip.findFirst as jest.Mock).mockResolvedValue(null);
      (prismaService.trip.create as jest.Mock).mockResolvedValue({
        id: 'b1d0337c-3fba-4bf1-a8b4-b9b9c0378eb8',
        status: TripStatus.SEARCHING,
      });

      return request(app.getHttpServer())
        .post('/api/v1/match/request')
        .send({
          passengerId: 'a1d0337c-3fba-4bf1-a8b4-b9b9c0378eb8',
          originLatitude: 10.5,
          originLongitude: -20.3,
          destinationLatitude: 12.5,
          destinationLongitude: -22.3,
          price: 15.5,
        })
        .expect(201);
    });

    it('POST /api/v1/match/request - should fail validation (400) if missing fields', async () => {
      return request(app.getHttpServer())
        .post('/api/v1/match/request')
        .send({ passengerId: 'a1d0337c-3fba-4bf1-a8b4-b9b9c0378eb8' })
        .expect(400);
    });
  });

  describe('PricingController', () => {
    it('POST /api/v1/pricing/calculate - should return calculated fare', async () => {
      return request(app.getHttpServer())
        .post('/api/v1/pricing/calculate')
        .send({
          distanceKm: 10,
          timeMinutes: 20,
          zone: 'A',
        })
        .expect(201)
        .expect((res) => {
          expect(res.body.total).toBe(27);
          expect(res.body.breakdown).toBeDefined();
        });
    });
  });
});

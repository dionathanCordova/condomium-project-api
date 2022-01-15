import { Test, TestingModule } from '@nestjs/testing';
import {
  INestApplication,
  NotAcceptableException,
  NotFoundException,
  ValidationPipe,
} from '@nestjs/common';
import * as request from 'supertest';
import { getRepositoryToken } from '@nestjs/typeorm';
import { WaterExpensesModule } from '../water-expenses.module';
import { WaterExpensesRepository } from '../water-expenses.repository';
import {
  mockWaterExpenses,
  mockWaterExpensesRepository,
} from './mockWaterExpenses';

describe('Water Expenses (integration)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [WaterExpensesModule],
    })
      .overrideProvider(getRepositoryToken(WaterExpensesRepository))
      .useValue(mockWaterExpensesRepository)
      .compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());

    await app.init();
  });

  describe('When find water expenses', () => {
    it('/water-expenses/:month/:year/:condominium_id (GET) by month, year and condominium_id', async () => {
      const response = await request(app.getHttpServer())
        .get('/water-expenses/2/2021/09982e30-1e9b-4ba6-b065-88441deb0900')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.body).toEqual(mockWaterExpenses());
    });
  });

  describe('When create water expenses', () => {
    it('/water-expenses (POST)', async () => {
      jest
        .spyOn(mockWaterExpensesRepository, 'findOne')
        .mockResolvedValueOnce(null);

      const response = await request(app.getHttpServer())
        .post('/water-expenses')
        .send(mockWaterExpenses())
        .expect('Content-Type', /json/)
        .expect(201);

      expect(response.body).toEqual(mockWaterExpenses());
    });

    it('/water-expenses (POST) -- error when condominiun is not found', async () => {
      jest
        .spyOn(mockWaterExpensesRepository, 'createWaterExpenses')
        .mockRejectedValueOnce(
          new NotAcceptableException('Water expenses already exists'),
        );

      return request(app.getHttpServer())
        .post('/water-expenses')
        .send(mockWaterExpenses())
        .expect('Content-Type', /json/)
        .expect(406)
        .then((response) => {
          expect(response.body).toEqual({
            statusCode: 406,
            message: 'Water expenses already exists',
            error: 'Not Acceptable',
          });
        });
    });
  });

  describe('When update water expenses', () => {
    it('/water-expenses/:id (PATH) -- should return error when cond id is missing', async () => {
      const response = await request(app.getHttpServer())
        .patch('/water-expenses')
        .send(mockWaterExpenses())
        .expect(404);

      expect(response.body).toEqual({
        statusCode: 404,
        message: 'Cannot PATCH /water-expenses',
        error: 'Not Found',
      });
    });

    it('/water-expenses/:id (PATH) -- should update config', async () => {
      return request(app.getHttpServer())
        .patch(`/water-expenses/09982e30-1e9b-4ba6-b065-88441deb0900`)
        .send(mockWaterExpenses())
        .expect('Content-Type', /json/)
        .expect(200)
        .expect(mockWaterExpenses());
    });

    it('/water-expenses (PATH) -- should throw error when expanse is not found', async () => {
      jest
        .spyOn(mockWaterExpensesRepository, 'updateWaterExpenses')
        .mockRejectedValueOnce(
          new NotFoundException('Water Expense not found!'),
        );

      const response = await request(app.getHttpServer())
        .patch(`/water-expenses/09982e30-1e9b-4ba6-b065-88441deb0900`)
        .send(mockWaterExpenses())
        .expect(404);

      expect(response.body).toEqual({
        statusCode: 404,
        message: 'Water Expense not found!',
        error: 'Not Found',
      });
    });
  });
});

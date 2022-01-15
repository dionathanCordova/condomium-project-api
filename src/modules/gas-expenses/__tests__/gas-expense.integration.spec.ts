import { Test, TestingModule } from '@nestjs/testing';
import {
  INestApplication,
  NotAcceptableException,
  NotFoundException,
  ValidationPipe,
} from '@nestjs/common';
import * as request from 'supertest';
import { getRepositoryToken } from '@nestjs/typeorm';
import { GasExpensesModule } from '../gas-expenses.module';
import { GasExpensesRepository } from '../gas-expenses.repository';
import { mockGasExpenses, mockGasExpensesRepository } from './mockGasExpenses';

describe('Gas Expenses (integration)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [GasExpensesModule],
    })
      .overrideProvider(getRepositoryToken(GasExpensesRepository))
      .useValue(mockGasExpensesRepository)
      .compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());

    await app.init();
  });

  describe('When find Gas expenses', () => {
    it('/gas-expenses/:month/:year/:condominium_id (GET) by month, year and condominium_id', async () => {
      const response = await request(app.getHttpServer())
        .get('/gas-expenses/2/2021/09982e30-1e9b-4ba6-b065-88441deb0900')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.body).toEqual(mockGasExpenses());
    });
  });

  describe('When create Gas expenses', () => {
    it('/gas-expenses (POST)', async () => {
      jest
        .spyOn(mockGasExpensesRepository, 'findOne')
        .mockResolvedValueOnce(null);

      const response = await request(app.getHttpServer())
        .post('/gas-expenses')
        .send(mockGasExpenses())
        .expect('Content-Type', /json/)
        .expect(201);

      expect(response.body).toEqual(mockGasExpenses());
    });

    it('/gas-expenses (POST) -- error when condominiun is not found', async () => {
      jest
        .spyOn(mockGasExpensesRepository, 'createGasExpenses')
        .mockRejectedValueOnce(
          new NotAcceptableException('Gas expenses already exists'),
        );

      return request(app.getHttpServer())
        .post('/gas-expenses')
        .send(mockGasExpenses())
        .expect('Content-Type', /json/)
        .expect(406)
        .then((response) => {
          expect(response.body).toEqual({
            statusCode: 406,
            message: 'Gas expenses already exists',
            error: 'Not Acceptable',
          });
        });
    });
  });

  describe('When update Gas expenses', () => {
    it('/gas-expenses/:id (PATH) -- should return error when cond id is missing', async () => {
      const response = await request(app.getHttpServer())
        .patch('/gas-expenses')
        .send(mockGasExpenses())
        .expect(404);

      expect(response.body).toEqual({
        statusCode: 404,
        message: 'Cannot PATCH /gas-expenses',
        error: 'Not Found',
      });
    });

    it('/gas-expenses/:id (PATH) -- should update config', async () => {
      return request(app.getHttpServer())
        .patch(`/gas-expenses/09982e30-1e9b-4ba6-b065-88441deb0900`)
        .send(mockGasExpenses())
        .expect('Content-Type', /json/)
        .expect(200)
        .expect(mockGasExpenses());
    });

    it('/gas-expenses (PATH) -- should throw error when expanse is not found', async () => {
      jest
        .spyOn(mockGasExpensesRepository, 'updateGasExpenses')
        .mockRejectedValueOnce(new NotFoundException('Gas Expense not found!'));

      const response = await request(app.getHttpServer())
        .patch(`/gas-expenses/09982e30-1e9b-4ba6-b065-88441deb0900`)
        .send(mockGasExpenses())
        .expect(404);

      expect(response.body).toEqual({
        statusCode: 404,
        message: 'Gas Expense not found!',
        error: 'Not Found',
      });
    });
  });
});

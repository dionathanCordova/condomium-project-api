import { Test, TestingModule } from '@nestjs/testing';
import {
  INestApplication,
  NotAcceptableException,
  NotFoundException,
  ValidationPipe,
} from '@nestjs/common';
import * as request from 'supertest';
import { getRepositoryToken } from '@nestjs/typeorm';
import {
  mockApartmentExpenses,
  mockApartmentExpensesRepository,
} from './mockApartmentExpenses';
import { ApartmentExpensesModule } from '../apartment-expense.module';
import { ApartmentExpensesRepository } from '../apartment-expenses.repository';

describe('Apartment Expenses (integration)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [ApartmentExpensesModule],
    })
      .overrideProvider(getRepositoryToken(ApartmentExpensesRepository))
      .useValue(mockApartmentExpensesRepository)
      .compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());

    await app.init();
  });

  describe('When find apartment expenses', () => {
    it('/apartment-expenses/:month/:year/:condominium_id (GET) by month, year and condominium_id', async () => {
      const response = await request(app.getHttpServer())
        .get('/apartment-expenses/2/2021/09982e30-1e9b-4ba6-b065-88441deb0900')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.body).toEqual(mockApartmentExpenses());
    });
  });

  describe('When create apartment expenses', () => {
    it('/apartment-expenses (POST)', async () => {
      jest
        .spyOn(mockApartmentExpensesRepository, 'findOne')
        .mockResolvedValueOnce(null);

      const response = await request(app.getHttpServer())
        .post('/apartment-expenses')
        .send(mockApartmentExpenses())
        .expect('Content-Type', /json/)
        .expect(201);

      expect(response.body).toEqual(mockApartmentExpenses());
    });

    it('/apartment-expenses (POST) -- error when condominiun is not found', async () => {
      jest
        .spyOn(mockApartmentExpensesRepository, 'createApartmentExpenses')
        .mockRejectedValueOnce(
          new NotAcceptableException('Apartment expenses already exists'),
        );

      return request(app.getHttpServer())
        .post('/apartment-expenses')
        .send(mockApartmentExpenses())
        .expect('Content-Type', /json/)
        .expect(406)
        .then((response) => {
          expect(response.body).toEqual({
            statusCode: 406,
            message: 'Apartment expenses already exists',
            error: 'Not Acceptable',
          });
        });
    });
  });

  describe('When update apartment expenses', () => {
    it('/apartment-expenses/:id (PATH) -- should return error when cond id is missing', async () => {
      const response = await request(app.getHttpServer())
        .patch('/apartment-expenses')
        .send(mockApartmentExpenses())
        .expect(404);

      expect(response.body).toEqual({
        statusCode: 404,
        message: 'Cannot PATCH /apartment-expenses',
        error: 'Not Found',
      });
    });

    it('/apartment-expenses/:id (PATH) -- should update config', async () => {
      return request(app.getHttpServer())
        .patch(`/apartment-expenses/09982e30-1e9b-4ba6-b065-88441deb0900`)
        .send(mockApartmentExpenses())
        .expect('Content-Type', /json/)
        .expect(200)
        .expect(mockApartmentExpenses());
    });

    it('/apartment-expenses (PATH) -- should throw error when expanse is not found', async () => {
      jest
        .spyOn(mockApartmentExpensesRepository, 'updateApartmentExpenses')
        .mockRejectedValueOnce(
          new NotFoundException('Apartment Expense not found!'),
        );

      const response = await request(app.getHttpServer())
        .patch(`/apartment-expenses/09982e30-1e9b-4ba6-b065-88441deb0900`)
        .send(mockApartmentExpenses())
        .expect(404);

      expect(response.body).toEqual({
        statusCode: 404,
        message: 'Apartment Expense not found!',
        error: 'Not Found',
      });
    });
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import {
  INestApplication,
  NotAcceptableException,
  NotFoundException,
  ValidationPipe,
} from '@nestjs/common';
import * as request from 'supertest';
import { getRepositoryToken } from '@nestjs/typeorm';
import { mockExpense, mockExpenseReport } from './mockExpenseReport';
import { ExpenseReportModule } from '../expense-report.module';
import { ExpenseReportRepository } from '../expense-report.repository';

describe('Expense Report (integration)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [ExpenseReportModule],
    })
      .overrideProvider(getRepositoryToken(ExpenseReportRepository))
      .useValue(mockExpenseReport)
      .compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());

    await app.init();
  });

  describe('When find config', () => {
    it('/expense-report/:month/:year/:condominium_id (GET) by month, year and condominium_id', async () => {
      const response = await request(app.getHttpServer())
        .get('/expense-report/2/2021/09982e30-1e9b-4ba6-b065-88441deb0900')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.body).toEqual(mockExpense());
    });
  });

  describe('When create expense report', () => {
    it('/expense-report (POST)', async () => {
      jest.spyOn(mockExpenseReport, 'findOne').mockResolvedValueOnce(null);

      const response = await request(app.getHttpServer())
        .post('/expense-report')
        .send(mockExpense())
        .expect('Content-Type', /json/)
        .expect(201);

      expect(response.body).toEqual(mockExpense());
    });

    it('/expense-report (POST) -- error when condominiun is not found', async () => {
      jest
        .spyOn(mockExpenseReport, 'createExpenseReport')
        .mockRejectedValueOnce(
          new NotAcceptableException('Expense report already exists'),
        );

      return request(app.getHttpServer())
        .post('/expense-report')
        .send(mockExpense())
        .expect('Content-Type', /json/)
        .expect(406)
        .then((response) => {
          expect(response.body).toEqual({
            statusCode: 406,
            message: 'Expense report already exists',
            error: 'Not Acceptable',
          });
        });
    });
  });

  describe('When update expense', () => {
    it('/expense-report/:id (PATH) -- should return error when cond id is missing', async () => {
      const response = await request(app.getHttpServer())
        .patch('/expense-report')
        .send(mockExpense())
        .expect(404);

      expect(response.body).toEqual({
        statusCode: 404,
        message: 'Cannot PATCH /expense-report',
        error: 'Not Found',
      });
    });

    it('/expense-report/:id (PATH) -- should update config', async () => {
      return request(app.getHttpServer())
        .patch(`/expense-report/09982e30-1e9b-4ba6-b065-88441deb0900`)
        .send(mockExpense())
        .expect('Content-Type', /json/)
        .expect(200)
        .expect(mockExpense());
    });

    it('/expense-report (PATH) -- should throw error when expanse is not found', async () => {
      jest
        .spyOn(mockExpenseReport, 'updateExpenseReport')
        .mockRejectedValueOnce(new NotFoundException('Expense not found!'));

      const response = await request(app.getHttpServer())
        .patch(`/expense-report/09982e30-1e9b-4ba6-b065-88441deb0900`)
        .send(mockExpense())
        .expect(404);

      expect(response.body).toEqual({
        statusCode: 404,
        message: 'Expense not found!',
        error: 'Not Found',
      });
    });
  });
});

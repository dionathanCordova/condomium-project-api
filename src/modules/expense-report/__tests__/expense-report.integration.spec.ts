import { Test, TestingModule } from '@nestjs/testing';
import {
  INestApplication,
  NotAcceptableException,
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
    it('/expense-report (GET) by month, year and condominium_id', async () => {
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

  // todo continuar demais testes

  //   it('/cond-config (POST) -- validation error', async () => {
  //     return request(app.getHttpServer())
  //       .post('/cond-config')
  //       .expect('Content-Type', /json/)
  //       .expect(400)
  //       .expect({
  //         statusCode: 400,
  //         message: [
  //           'basic_water_rate must be a number conforming to the specified constraints',
  //           'basic_water_rate should not be empty',
  //           'average_water_rate must be a number conforming to the specified constraints',
  //           'average_water_rate should not be empty',
  //           'high_water_rate must be a number conforming to the specified constraints',
  //           'high_water_rate should not be empty',
  //           'cleaning_fee must be a number conforming to the specified constraints',
  //           'reserve_value must be a number conforming to the specified constraints',
  //           'm3_gas_value must be a number conforming to the specified constraints',
  //           'liquidator_exempt must be a boolean value',
  //           'payment_plan must be a string',
  //           'year must be a number conforming to the specified constraints',
  //           'year should not be empty',
  //           'condominium_id must be a string',
  //           'condominium_id should not be empty',
  //         ],
  //         error: 'Bad Request',
  //       });
  //   });
  // });

  // describe('When update config', () => {
  //   it('/cond-config (PATH) -- should return error when cond id is missing', async () => {
  //     const response = await request(app.getHttpServer())
  //       .patch('/cond-config')
  //       .send(mockExpense())
  //       .expect(404);

  //     expect(response.body).toEqual({
  //       statusCode: 404,
  //       message: 'Cannot PATCH /cond-config',
  //       error: 'Not Found',
  //     });
  //   });

  //   it('/cond-config (PATH) -- should update config', async () => {
  //     const response = await request(app.getHttpServer())
  //       .patch(`/cond-config/09982e30-1e9b-4ba6-b065-88441deb0900`)
  //       .send(mockExpense())
  //       .expect('Content-Type', /json/)
  //       .expect(200);

  //     expect(response.body).toEqual(mockConfigOutput());
  //   });

  //   it('/cond-config (PATH) -- should throw error when condominium is not found', async () => {
  //     jest
  //       .spyOn(mockConfigRepository, 'updateConfig')
  //       .mockRejectedValueOnce(new NotFoundException('Condominium not found!'));

  //     const response = await request(app.getHttpServer())
  //       .patch(`/cond-config/09982e30-1e9b-4ba6-b065-88441deb0900`)
  //       .send(mockExpense())
  //       .expect(404);

  //     expect(response.body).toEqual({
  //       statusCode: 404,
  //       message: 'Condominium not found!',
  //       error: 'Not Found',
  //     });
  //   });
  // });
});

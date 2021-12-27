import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { getRepositoryToken } from '@nestjs/typeorm';
import { mockExpensesRepositoty, mockExpense } from './mockRepository';
import { ExpensesModule } from '../expenses.module';
import { ExpensesRepository } from '../expenses.repository';

describe('ExpenseController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [ExpensesModule],
    })
      .overrideProvider(getRepositoryToken(ExpensesRepository))
      .useValue(mockExpensesRepositoty)
      .compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());

    await app.init();
  });

  describe('When find expenses', () => {
    it('/expenses (GET) all', async () => {
      const response = await request(app.getHttpServer())
        .get(`/expenses/${mockExpense().month}/${mockExpense().year}`)
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.body).toEqual(mockExpense());
    });
  });

  describe('When create expenses', () => {
    it('/expenses (POST)', async () => {
      return request(app.getHttpServer())
        .post('/expenses')
        .expect('Content-Type', /json/)
        .expect(201)
        .expect(mockExpense());
    });
  });

  describe('When update expenses', () => {
    it('/expenses (Patch)', async () => {
      return request(app.getHttpServer())
        .patch(`/expenses/${mockExpense().id}`)
        .expect('Content-Type', /json/)
        .expect(200)
        .expect(mockExpense());
    });
  });

  describe('When remove expenses', () => {
    it('/expenses (Delete)', async () => {
      return request(app.getHttpServer())
        .delete(`/expenses/${mockExpense().id}`)
        .expect('Content-Type', /json/)
        .expect(200)
        .expect(mockExpense());
    });
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ExpensesCategoryModule } from '../expenses-category.module';
import { ExpensesCategoryRepository } from '../expences-category.repository';
import { mockExpense, mockExpensesCategoryRepository } from './mockExpences';

describe('Expense Category (integration)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [ExpensesCategoryModule],
    })
      .overrideProvider(getRepositoryToken(ExpensesCategoryRepository))
      .useValue(mockExpensesCategoryRepository)
      .compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());

    await app.init();
  });

  describe('When find expenses category', () => {
    it('/expenses-category (GET) all', async () => {
      const response = await request(app.getHttpServer())
        .get('/expenses-category')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.body).toEqual(mockExpense());
    });
  });

  describe('When create expenses category', () => {
    it('/expenses-category (POST)', async () => {
      return request(app.getHttpServer())
        .post('/expenses-category')
        .expect('Content-Type', /json/)
        .expect(201)
        .expect(mockExpense());
    });
  });

  describe('When update expenses category', () => {
    it('/expenses-category (Patch)', async () => {
      return request(app.getHttpServer())
        .patch(`/expenses-category/${mockExpense().id}`)
        .expect('Content-Type', /json/)
        .expect(200)
        .expect(mockExpense());
    });
  });

  describe('When remove expenses category', () => {
    it('/expenses-category (Delete)', async () => {
      return request(app.getHttpServer())
        .delete(`/expenses-category/${mockExpense().id}`)
        .expect('Content-Type', /json/)
        .expect(200)
        .expect(mockExpense());
    });
  });
});

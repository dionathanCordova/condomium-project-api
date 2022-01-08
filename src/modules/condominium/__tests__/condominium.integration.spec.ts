import { Test, TestingModule } from '@nestjs/testing';
import {
  INestApplication,
  NotFoundException,
  ValidationPipe,
} from '@nestjs/common';
import * as request from 'supertest';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CondominiumModule } from '../condominium.module';
import { CondRepository } from '../condominium.repository';
import { mockCond, mockCondStub } from './mockCond';

describe('Condominium (integration)', () => {
  let app: INestApplication;

  const mockCondominiumRepository = {
    find: jest.fn().mockResolvedValue(mockCondStub()),
    findOne: jest.fn().mockResolvedValue(mockCondStub()),
    createCond: jest.fn().mockResolvedValue(mockCondStub()),
    updateCond: jest.fn().mockResolvedValue(mockCondStub()),
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [CondominiumModule],
    })
      .overrideProvider(getRepositoryToken(CondRepository))
      .useValue(mockCondominiumRepository)
      .compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());

    await app.init();
  });

  describe('When find condominiuns', () => {
    it('/condominium (GET) all', async () => {
      const response = await request(app.getHttpServer())
        .get('/condominium')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.body).toEqual(mockCondStub());
    });

    it('/cond-config (GET) last by id', async () => {
      const response = await request(app.getHttpServer())
        .get('/condominium/21a19f85-cfeb-4ad4-8474-c1aac4b88643')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.body).toEqual(mockCondStub());
    });
  });

  describe('When create condominium', () => {
    it('/condominium (POST)', async () => {
      const response = await request(app.getHttpServer())
        .post('/condominium')
        .send(mockCond())
        .expect('Content-Type', /json/)
        .expect(201);

      expect(response.body).toEqual(mockCondStub());
    });

    it('/condominium (POST) -- validation error', async () => {
      return request(app.getHttpServer())
        .post('/condominium')
        .expect('Content-Type', /json/)
        .expect(400)
        .expect({
          statusCode: 400,
          message: [
            'name should not be empty',
            'name must be a string',
            'count_apartments should not be empty',
            'count_apartments must be a number conforming to the specified constraints',
          ],
          error: 'Bad Request',
        });
    });
  });

  describe('When update condominium', () => {
    it('/condominium (PATH) -- should return error when cond id is missing', async () => {
      const response = await request(app.getHttpServer())
        .patch('/condominium')
        .send(mockCond())
        .expect(404);

      expect(response.body).toEqual({
        statusCode: 404,
        message: 'Cannot PATCH /condominium',
        error: 'Not Found',
      });
    });

    it('/condominium (PATH) -- should update config', async () => {
      const response = await request(app.getHttpServer())
        .patch(`/condominium/21a19f85-cfeb-4ad4-8474-c1aac4b88643`)
        .send(mockCond())
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.body).toEqual(mockCondStub());
    });

    it('/condominium (PATH) -- should throw error when condominium is not found', async () => {
      jest
        .spyOn(mockCondominiumRepository, 'updateCond')
        .mockRejectedValueOnce(new NotFoundException('Condominium not found!'));

      const response = await request(app.getHttpServer())
        .patch(`/condominium/21a19f85-cfeb-4ad4-8474-c1aac4b88643`)
        .send(mockCond())
        .expect(404);

      expect(response.body).toEqual({
        statusCode: 404,
        message: 'Condominium not found!',
        error: 'Not Found',
      });
    });
  });
});

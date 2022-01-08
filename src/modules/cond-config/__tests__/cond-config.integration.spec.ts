import { Test, TestingModule } from '@nestjs/testing';
import {
  INestApplication,
  NotFoundException,
  ValidationPipe,
} from '@nestjs/common';
import * as request from 'supertest';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CondConfigModule } from '../cond-config.module';
import { CondConfigRepository } from '../cond-config.repository';
import { mockCondConfig, mockConfigOutput } from './mockConfig';

describe('Cond config (integration)', () => {
  let app: INestApplication;

  const mockConfigRepository = {
    find: jest.fn().mockResolvedValue(mockConfigOutput()),
    findOne: jest.fn().mockResolvedValue(mockConfigOutput()),
    createConfig: jest.fn().mockResolvedValue(mockConfigOutput()),
    updateConfig: jest.fn().mockResolvedValue(mockConfigOutput()),
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [CondConfigModule],
    })
      .overrideProvider(getRepositoryToken(CondConfigRepository))
      .useValue(mockConfigRepository)
      .compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());

    await app.init();
  });

  describe('When find config', () => {
    it('/cond-config (GET) all by id', async () => {
      const response = await request(app.getHttpServer())
        .get('/cond-config/09982e30-1e9b-4ba6-b065-88441deb0900')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.body).toEqual(mockConfigOutput());
    });

    it('/cond-config (GET) last by id', async () => {
      const response = await request(app.getHttpServer())
        .get('/cond-config/09982e30-1e9b-4ba6-b065-88441deb0900/last')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.body).toEqual(mockConfigOutput());
    });
  });

  describe('When create user', () => {
    it('/cond-config (POST)', async () => {
      const response = await request(app.getHttpServer())
        .post('/cond-config')
        .send(mockCondConfig())
        .expect('Content-Type', /json/)
        .expect(201);

      expect(response.body).toEqual(mockConfigOutput());
    });

    it('/cond-config (POST) -- error when condominiun is not found', async () => {
      jest
        .spyOn(mockConfigRepository, 'createConfig')
        .mockRejectedValueOnce(new NotFoundException('Condominium not found!'));

      return request(app.getHttpServer())
        .post('/cond-config')
        .send(mockCondConfig())
        .expect('Content-Type', /json/)
        .expect(404)
        .then((response) => {
          expect(response.body).toEqual({
            statusCode: 404,
            message: 'Condominium not found!',
            error: 'Not Found',
          });
        });
    });

    it('/cond-config (POST) -- validation error', async () => {
      return request(app.getHttpServer())
        .post('/cond-config')
        .expect('Content-Type', /json/)
        .expect(400)
        .expect({
          statusCode: 400,
          message: [
            'basic_water_rate must be a number conforming to the specified constraints',
            'basic_water_rate should not be empty',
            'average_water_rate must be a number conforming to the specified constraints',
            'average_water_rate should not be empty',
            'high_water_rate must be a number conforming to the specified constraints',
            'high_water_rate should not be empty',
            'cleaning_fee must be a number conforming to the specified constraints',
            'reserve_value must be a number conforming to the specified constraints',
            'm3_gas_value must be a number conforming to the specified constraints',
            'liquidator_exempt must be a boolean value',
            'payment_plan must be a string',
            'year must be a number conforming to the specified constraints',
            'year should not be empty',
            'condominium_id must be a string',
            'condominium_id should not be empty',
          ],
          error: 'Bad Request',
        });
    });
  });

  describe('When update config', () => {
    it('/cond-config (PATH) -- should return error when cond id is missing', async () => {
      const response = await request(app.getHttpServer())
        .patch('/cond-config')
        .send(mockCondConfig())
        .expect(404);

      expect(response.body).toEqual({
        statusCode: 404,
        message: 'Cannot PATCH /cond-config',
        error: 'Not Found',
      });
    });

    it('/cond-config (PATH) -- should update config', async () => {
      const response = await request(app.getHttpServer())
        .patch(`/cond-config/09982e30-1e9b-4ba6-b065-88441deb0900`)
        .send(mockCondConfig())
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.body).toEqual(mockConfigOutput());
    });

    it('/cond-config (PATH) -- should throw error when condominium is not found', async () => {
      jest
        .spyOn(mockConfigRepository, 'updateConfig')
        .mockRejectedValueOnce(new NotFoundException('Condominium not found!'));

      const response = await request(app.getHttpServer())
        .patch(`/cond-config/09982e30-1e9b-4ba6-b065-88441deb0900`)
        .send(mockCondConfig())
        .expect(404);

      expect(response.body).toEqual({
        statusCode: 404,
        message: 'Condominium not found!',
        error: 'Not Found',
      });
    });
  });
});

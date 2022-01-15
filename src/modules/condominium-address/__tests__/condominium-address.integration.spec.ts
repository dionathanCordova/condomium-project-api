import { Test, TestingModule } from '@nestjs/testing';
import {
  INestApplication,
  NotFoundException,
  ValidationPipe,
} from '@nestjs/common';
import * as request from 'supertest';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CondominiumAddressModule } from '../condominium-address.module';
import { CondominiumAddressRepository } from '../condominium-address.repository';
import {
  mockCondominiumAddressRepository,
  mockCondominiumStub,
} from './mockCondominiumAddress';

describe('Condominium Address (integration)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [CondominiumAddressModule],
    })
      .overrideProvider(getRepositoryToken(CondominiumAddressRepository))
      .useValue(mockCondominiumAddressRepository)
      .compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());

    await app.init();
  });

  describe('When find condominium address', () => {
    it('/condominium/address (GET) all', async () => {
      const response = await request(app.getHttpServer())
        .get('/condominium/address')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.body).toEqual(mockCondominiumStub());
    });

    it('/cond-config (GET) last by id', async () => {
      const response = await request(app.getHttpServer())
        .get('/condominium/address/21a19f85-cfeb-4ad4-8474-c1aac4b88643')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.body).toEqual(mockCondominiumStub());
    });
  });

  describe('When create condominium address', () => {
    it('/condominium/address (POST)', async () => {
      const response = await request(app.getHttpServer())
        .post('/condominium/address')
        .send(mockCondominiumStub())
        .expect('Content-Type', /json/)
        .expect(201);

      expect(response.body).toEqual(mockCondominiumStub());
    });

    it('/condominium/address (POST) -- validation error', async () => {
      return request(app.getHttpServer())
        .post('/condominium/address')
        .expect('Content-Type', /json/)
        .expect(400)
        .expect({
          statusCode: 400,
          message: [
            'city should not be empty',
            'city must be a string',
            'state should not be empty',
            'state must be a string',
            'cep should not be empty',
            'cep must be a string',
            'number should not be empty',
            'number must be a string',
            'country should not be empty',
            'country must be a string',
            'condominium_id should not be empty',
            'condominium_id must be a string',
          ],
          error: 'Bad Request',
        });
    });
  });

  describe('When update condominium address', () => {
    it('/condominium/address (PATH) -- should return error when cond id is missing', async () => {
      const response = await request(app.getHttpServer())
        .patch('/condominium/address')
        .send(mockCondominiumStub())
        .expect(404);

      expect(response.body).toEqual({
        statusCode: 404,
        message: 'Cannot PATCH /condominium/address',
        error: 'Not Found',
      });
    });

    it('/condominium/address (PATH) -- should update condominium address', async () => {
      const response = await request(app.getHttpServer())
        .patch(`/condominium/address/21a19f85-cfeb-4ad4-8474-c1aac4b88643`)
        .send(mockCondominiumStub())
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.body).toEqual(mockCondominiumStub());
    });

    it('/condominium/address (PATH) -- should throw error when condominium is not found', async () => {
      jest
        .spyOn(mockCondominiumAddressRepository, 'updateCondominiumAddress')
        .mockRejectedValueOnce(
          new NotFoundException('Condominium address not found!'),
        );

      const response = await request(app.getHttpServer())
        .patch(`/condominium/address/21a19f85-cfeb-4ad4-8474-c1aac4b88643`)
        .send(mockCondominiumStub())
        .expect(404);

      expect(response.body).toEqual({
        statusCode: 404,
        message: 'Condominium address not found!',
        error: 'Not Found',
      });
    });
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ApartmentsModule } from '../apartments.module';
import { ApartmentsRepository } from '../apartments.repository';
import { mockApartment, mockApartmentsStub } from './mockApartments';

describe('UserController (e2e)', () => {
  let app: INestApplication;

  const mockApartmentsRepository = {
    findAll: jest.fn().mockResolvedValue(mockApartmentsStub()),
    getOne: jest.fn(),
    createApartment: jest.fn().mockResolvedValue(mockApartmentsStub()[0]),
    findOne: jest.fn(),
    deleteApartment: jest.fn().mockResolvedValue(mockApartmentsStub()[0]),
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [ApartmentsModule],
    })
      .overrideProvider(getRepositoryToken(ApartmentsRepository))
      .useValue(mockApartmentsRepository)
      .compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());

    await app.init();
  });

  describe('When find apartments', () => {
    it('/apartments (GET) all', async () => {
      const response = await request(app.getHttpServer())
        .get('/apartments/21a19f85-cfeb-4ad4-8474-c1aac4b88643')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.body).toEqual(mockApartmentsStub());
    });
  });

  describe('When create apartments', () => {
    it('/apartments (POST)', async () => {
      mockApartmentsRepository.getOne.mockResolvedValueOnce(undefined);

      const response = await request(app.getHttpServer())
        .post('/apartments')
        .send(mockApartment())
        .expect('Content-Type', /json/)
        .expect(201);

      expect(response.body).toEqual(mockApartmentsStub()[0]);
    });

    it('/apartments (POST) -- validation error', async () => {
      return request(app.getHttpServer())
        .post('/apartments')
        .expect('Content-Type', /json/)
        .expect(400)
        .expect({
          statusCode: 400,
          message: [
            'apartment must be a string',
            'apartment should not be empty',
            'condominium_id must be a string',
            'condominium_id should not be empty',
          ],
          error: 'Bad Request',
        });
    });

    it('apartments (POST) -- throw error when apartment already exists', async () => {
      mockApartmentsRepository.getOne.mockResolvedValueOnce(
        mockApartmentsStub()[0],
      );

      return request(app.getHttpServer())
        .post('/apartments')
        .send(mockApartment())
        .expect('Content-Type', /json/)
        .expect(406)
        .expect({
          statusCode: 406,
          message: 'Apartment already exists',
          error: 'Not Acceptable',
        });
    });
  });

  describe('When remove apartments', () => {
    it('apartments (Delete)', async () => {
      mockApartmentsRepository.findOne.mockResolvedValueOnce(
        mockApartmentsStub()[0],
      );

      return request(app.getHttpServer())
        .delete('/apartments/21a19f85-cfeb-4ad4-8474-c1aac4b88643')
        .expect('Content-Type', /json/)
        .expect(200)
        .expect(mockApartmentsStub()[0]);
    });

    it('apartments (Delete) -- throws an error if apartment not exists', async () => {
      mockApartmentsRepository.findOne.mockResolvedValueOnce(undefined);

      return request(app.getHttpServer())
        .delete('/apartments/21a19f85-cfeb-4ad4-8474-c1aac4b88643')
        .expect('Content-Type', /json/)
        .expect(406)
        .expect({
          statusCode: 406,
          message: 'Apartment not exists',
          error: 'Not Acceptable',
        });
    });
  });
});

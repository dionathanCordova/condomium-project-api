import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { getRepositoryToken } from '@nestjs/typeorm';
import { v4 as uuid } from 'uuid';
import { UsersModule } from '../../users.module';
import { UsersRepository } from '../../users.repository';

describe('Users (integration)', () => {
  let app: INestApplication;

  const mockUser = {
    id: '09982e30-1e9b-4ba6-b065-88441deb0e7c',
    name: 'dionathan',
    telephone: '123',
    apartment: '201',
    condominium_id: 1,
    email: 'dionathan@test.com',
    password: uuid(),
    permission_id: 0,
    avatar: 'teste.png',
    can_show_data: true,
    is_admin: false,
  };

  const mockUsersRepository = {
    findAll: jest.fn().mockResolvedValue(mockUser),
    createUser: jest.fn().mockResolvedValue(mockUser),
    findOne: jest.fn().mockResolvedValue(mockUser),
    update: jest.fn().mockResolvedValue(mockUser),
    findOneOrFail: jest.fn().mockResolvedValue(mockUser),
    merge: jest.fn().mockResolvedValue(mockUser),
    save: jest.fn().mockResolvedValue(mockUser),
    delete: jest.fn().mockResolvedValue(mockUser),
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [UsersModule],
    })
      .overrideProvider(getRepositoryToken(UsersRepository))
      .useValue(mockUsersRepository)
      .compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());

    await app.init();
  });

  it('/users (GET)', () => {
    return request(app.getHttpServer())
      .get('/users')
      .expect('Content-Type', /json/)
      .expect(200)
      .expect(mockUser);
  });

  describe('When create user', () => {
    it('/users (POST)', () => {
      jest.spyOn(mockUsersRepository, 'findOne').mockResolvedValueOnce(null);

      return request(app.getHttpServer())
        .post('/users')
        .send(mockUser)
        .expect('Content-Type', /json/)
        .expect(201)
        .then((response) => {
          expect(response.body).toEqual(mockUser);
        });
    });

    it('/users (POST) -- error email already in use', () => {
      return request(app.getHttpServer())
        .post('/users')
        .send(mockUser)
        .expect('Content-Type', /json/)
        .expect(406)
        .expect({ statusCode: 406, message: 'Not Acceptable' });
    });

    it('/users (POST) -- validation error', () => {
      return request(app.getHttpServer())
        .post('/users')
        .expect('Content-Type', /json/)
        .expect(400)
        .expect({
          statusCode: 400,
          message: [
            'name must be a string',
            'name should not be empty',
            'apartment must be a string',
            'apartment should not be empty',
            'email must be an email',
            'email should not be empty',
            'telephone must be a string',
            'telephone should not be empty',
            'password must be a string',
            'password should not be empty',
            'avatar must be a string',
            'avatar should not be empty',
            'permission_id must be a number conforming to the specified constraints',
            'permission_id should not be empty',
            'condominium_id must be a number conforming to the specified constraints',
            'condominium_id should not be empty',
            'is_admin must be a boolean value',
            'is_admin should not be empty',
            'can_show_data must be a boolean value',
            'can_show_data should not be empty',
          ],
          error: 'Bad Request',
        });
    });
  });

  describe('When update user', () => {
    it('/users (PATH)', () => {
      return request(app.getHttpServer())
        .patch(`/users/${mockUser.id}`)
        .send(mockUser)
        .expect('Content-Type', /json/)
        .expect(200)
        .then((response) => {
          expect(response.body).toEqual(mockUser);
        });
    });

    it('/users (PATH) -- validation error', () => {
      jest
        .spyOn(mockUsersRepository, 'findOneOrFail')
        .mockRejectedValueOnce(null);

      return request(app.getHttpServer())
        .patch(`/users/${mockUser.id}`)
        .send(mockUser)
        .expect('Content-Type', /json/)
        .expect(500)
        .then((response) => {
          expect(response.body).toEqual({
            statusCode: 500,
            message: 'Internal server error',
          });
        });
    });
  });

  describe('When remove user', () => {
    it('should remove user', () => {
      return request(app.getHttpServer())
        .delete(`/users/${mockUser.id}`)
        .expect(200)
        .then((response) => {
          expect(response.body).toEqual(mockUser);
        });
    });

    it('/users (PATH) -- validation error', () => {
      jest
        .spyOn(mockUsersRepository, 'findOneOrFail')
        .mockRejectedValueOnce(null);

      return request(app.getHttpServer())
        .delete(`/users/${mockUser.id}`)
        .expect(500)
        .then((response) => {
          expect(response.body).toEqual({
            statusCode: 500,
            message: 'Internal server error',
          });
        });
    });
  });
});

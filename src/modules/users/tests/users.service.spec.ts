import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UsersRepository } from '../users.repository';
import { UsersService } from '../users.service';
import { v4 as uuid } from 'uuid';

describe('UsersService', () => {
  let service: UsersService;

  const mockUserRepository = {
    createUser: jest.fn().mockImplementation((user) => Promise.resolve(user)),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(UsersRepository),
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be able to create a new user and return that', async () => {
    const user = {
      name: 'dionathan',
      telephone: '123',
      apartment: '201',
      condominium_id: 1,
      email: 'dionathan@test.com',
      password: uuid(),
      id: uuid(),
      permission_id: 0,
      avatar: '',
      can_show_data: true,
      is_admin: false,
    };

    expect(await service.create(user)).toEqual({
      id: expect.any(String),
      ...user,
    });
  });
});

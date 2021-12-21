import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersRepository } from '../../users.repository';
import { UsersService } from '../../users.service';
import { mockUser } from './mockUser';

describe('UsersService', () => {
  let service: UsersService;
  let userRepository: Repository<UsersRepository>;

  const mockUserRepository = {
    findAll: jest.fn().mockResolvedValue([mockUser(), mockUser()]),
    findOne: jest.fn().mockResolvedValue([mockUser()]),
    getOne: jest.fn().mockResolvedValue([mockUser()]),
    createUser: jest.fn().mockResolvedValue([mockUser()]),
    findOneOrFail: jest.fn().mockResolvedValue(mockUser()),
    merge: jest.fn().mockResolvedValue(mockUser()),
    save: jest.fn().mockResolvedValue(mockUser()),
    delete: jest.fn().mockResolvedValue(mockUser()),
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
    userRepository = module.get<Repository<UsersRepository>>(
      getRepositoryToken(UsersRepository),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('When find users', () => {
    it('should be able to find all users', async () => {
      const user1 = mockUser();
      const user2 = mockUser();
      expect(await service.findAll()).toEqual([user1, user2]);
      expect(mockUserRepository.findAll).toBeCalled();
    });

    it('should be able to find an user by id', async () => {
      const user = mockUser();

      expect(await service.findOne(user.id)).toMatchObject([user]);
    });
  });

  describe('When create an user', () => {
    it('should be able to create a new user and return that', async () => {
      const user = mockUser();

      jest.spyOn(mockUserRepository, 'findOne').mockResolvedValue(null);

      expect(await service.create(user)).toEqual([
        {
          id: expect.any(String),
          ...user,
        },
      ]);
      expect(mockUserRepository.createUser).toBeCalled();
    });

    it('should throw an exception', async () => {
      jest
        .spyOn(mockUserRepository, 'createUser')
        .mockRejectedValueOnce(new Error());

      expect(service.create(mockUser())).rejects.toThrowError();
    });

    it('shoul throw an not acceptable exeption when user email is already in use', () => {
      jest
        .spyOn(mockUserRepository, 'findOne')
        .mockResolvedValueOnce(mockUser());

      expect(service.create(mockUser())).rejects.toThrowError();
    });
  });

  describe('When update user', () => {
    it('should update an user', async () => {
      const user = mockUser();

      expect(await service.update(user.id, user)).toEqual(user);
    });

    it('should throw not found exception when update', async () => {
      jest
        .spyOn(userRepository, 'findOne')
        .mockRejectedValueOnce(new NotFoundException());

      try {
        expect(service.update).rejects.toThrowError(TypeError);
      } catch (error) {
        expect(error.message).toBe('User not found');
      }
    });
  });

  describe('Whem remove user', () => {
    it('should be able to remove user', async () => {
      const user = mockUser();
      expect(await service.remove(user.id)).toMatchObject(user);
    });

    it('should throw error when remove user fails', async () => {
      jest
        .spyOn(userRepository, 'findOneOrFail')
        .mockRejectedValueOnce(new Error());

      try {
        await service.remove(mockUser().id);
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
      }
    });
  });
});

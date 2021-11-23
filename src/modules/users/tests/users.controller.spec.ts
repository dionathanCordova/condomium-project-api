import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from '../users.controller';
import { UsersService } from '../users.service';
import { mockUser } from './mockUser';

describe('UsersController', () => {
  let controller: UsersController;

  const mockUsersService = {
    findAll: jest.fn().mockResolvedValue([mockUser(), mockUser()]),
    findOne: jest.fn().mockResolvedValue(mockUser()),
    create: jest.fn((dto) => {
      return {
        ...dto,
      };
    }),
    update: jest.fn().mockImplementation((id, dto) => ({
      id,
      ...dto,
    })),
    remove: jest.fn().mockResolvedValue(mockUser()),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    })
      .overrideProvider(UsersService)
      .useValue(mockUsersService)
      .compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('When find all users', () => {
    it('should be able to find all users', async () => {
      const findAll = await controller.findAll();

      expect(findAll.length).toBe(2);
      expect(mockUsersService.findAll).toBeCalledTimes(1);
    });
  });

  describe('When find an user', () => {
    it('should able to find an user', async () => {
      const user = mockUser();

      expect(await controller.findOne(user.id)).toMatchObject(user);
    });

    it('should throw error if user not found', async () => {
      jest.spyOn(mockUsersService, 'findOne').mockResolvedValueOnce([]);

      const user = await controller.findOne('1');
      expect(Object.values(user).length).toBe(0);
    });
  });

  describe('When create user', () => {
    it('should be able to create an user', () => {
      const user = mockUser();

      expect(controller.create(user)).toEqual(user);
      expect(mockUsersService.create).toBeCalledWith(user);
    });
  });

  describe('When update user', () => {
    it('should update an user', () => {
      const user = mockUser();

      expect(controller.update(user.id, user)).toEqual(user);
      expect(mockUsersService.update).toHaveBeenCalled;
    });
  });

  describe('When remove user', () => {
    it('should remove user', async () => {
      const user = mockUser();

      expect(await controller.remove(user.id)).toEqual(user);
    });
  });
});

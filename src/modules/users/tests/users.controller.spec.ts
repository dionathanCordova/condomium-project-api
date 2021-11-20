import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from '../users.controller';
import { UsersService } from '../users.service';
import { mockUser } from './mockUser';

describe('UsersController', () => {
  let controller: UsersController;

  const mockUsersService = {
    create: jest.fn((dto) => {
      return {
        ...dto,
      };
    }),
    update: jest.fn().mockImplementation((id, dto) => ({
      id,
      ...dto,
    })),
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

  it('should be able to create an user', () => {
    const user = mockUser();

    expect(controller.create(user)).toEqual(user);
    expect(mockUsersService.create).toBeCalledWith(user);
  });

  it('should update an user', () => {
    const user = mockUser();

    expect(controller.update(user.id, user)).toEqual(user);
    expect(mockUsersService.update).toHaveBeenCalled;
  });
});

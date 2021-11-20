import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from '../users.controller';
import { UsersService } from '../users.service';
import { v4 as uuid } from 'uuid';

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
    const user = {
      name: 'dionathan',
      telephone: '123',
      apartment: '201',
      condominium_id: 1,
      email: 'dionathan@test.com',
      password: uuid(),
      permission_id: 0,
      avatar: '',
      can_show_data: true,
      is_admin: false,
    };

    expect(controller.create(user)).toEqual(user);
    expect(mockUsersService.create).toBeCalledWith(user);
  });

  it('should update an user', () => {
    const user = {
      id: uuid(),
      name: 'dionathan',
      telephone: '123',
      apartment: '201',
      condominium_id: 1,
      email: 'dionathan@test.com',
      password: uuid(),
      permission_id: 0,
      avatar: '',
      can_show_data: true,
      is_admin: false,
    };

    expect(controller.update(user.id, user)).toEqual(user);
    expect(mockUsersService.update).toHaveBeenCalled;
  });
});

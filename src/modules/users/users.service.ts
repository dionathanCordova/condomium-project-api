import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  findAll() {
    return this.usersRepository.findAll();
  }

  findOne(id: string) {
    return this.usersRepository.getOne(id);
  }

  async create(createUserDto: CreateUserDto) {
    const checkUserEmail = await this.usersRepository.findOne({
      where: { email: createUserDto.email },
    });

    if (checkUserEmail) {
      throw new NotAcceptableException();
    }

    return this.usersRepository.createUser(createUserDto);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const findUser = await this.usersRepository.findOneOrFail(id);

    this.usersRepository.merge(findUser, updateUserDto);
    return this.usersRepository.save(findUser);
  }

  async remove(id: string) {
    await this.usersRepository.findOneOrFail(id);
    return this.usersRepository.delete(id);
  }
}

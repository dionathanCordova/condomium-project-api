import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  findAll() {
    return this.usersRepository.findAll();
  }

  findOne(id: number) {
    return this.usersRepository.getOne(id);
  }

  async create(createUserDto: CreateUserDto) {
    return this.usersRepository.createUser(createUserDto);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    await this.usersRepository.findOneOrFail(id);
    const userUpdate = this.usersRepository.update([id], updateUserDto);
    // return this.usersRepository.save(userUpdate);
  }

  remove(id: number) {
    // await this.UsuariosRepo.findOneOrFail(id);
    // await this.UsuariosRepo.delete(id);
    return `This action removes a #${id} user`;
  }
}

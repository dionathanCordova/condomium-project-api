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

  create(createUserDto: CreateUserDto) {
    return this.usersRepository.createUser(createUserDto);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    // await this.UsuariosRepo.findOneOrFail(id);
    // this.UsuariosRepo.update([id], body);
    // return this.UsuariosRepo.findOneOrFail(id);
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    // await this.UsuariosRepo.findOneOrFail(id);
    // await this.UsuariosRepo.delete(id);
    return `This action removes a #${id} user`;
  }
}

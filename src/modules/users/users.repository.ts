import { EntityRepository } from 'typeorm';
import { Users } from './entities/user.entity';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { CreateUserDto } from './dto/create-user.dto';

@EntityRepository(Users)
export class UsersRepository extends BaseRepository<Users> {
  async findAll() {
    return this.find();
  }

  async getOne(id: number) {
    return this.findOne(id);
  }

  async createUser(createUserDto: CreateUserDto) {
    const Usuarios = this.create(createUserDto);
    return this.save(Usuarios);
  }
}

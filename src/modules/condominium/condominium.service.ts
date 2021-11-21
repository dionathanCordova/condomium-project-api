import { Injectable } from '@nestjs/common';
import { CreateCondominiumDto } from './dto/create-condominium.dto';
import { UpdateCondominiumDto } from './dto/update-condominium.dto';

@Injectable()
export class CondominiumService {
  create(createCondominiumDto: CreateCondominiumDto) {
    return 'This action adds a new condominium';
  }

  findAll() {
    return `This action returns all condominium`;
  }

  findOne(id: number) {
    return `This action returns a #${id} condominium`;
  }

  update(id: number, updateCondominiumDto: UpdateCondominiumDto) {
    return `This action updates a #${id} condominium`;
  }

  remove(id: number) {
    return `This action removes a #${id} condominium`;
  }
}

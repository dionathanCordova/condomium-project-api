import { NotFoundException } from '@nestjs/common';
import { EntityRepository } from 'typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { CreateCondominiumDto } from './dto/create-condominium.dto';
import { UpdateCondominiumDto } from './dto/update-condominium.dto';
import { Condominium } from './entities/condominium.entity';

@EntityRepository(Condominium)
export class CondRepository extends BaseRepository<Condominium> {
  async createCond(createCondDto: CreateCondominiumDto) {
    const cond = this.create(createCondDto);
    return this.save(cond);
  }

  async updateCond(id: string, updateCondDto: UpdateCondominiumDto) {
    const find = await this.findOne(id);

    if (!find) throw new NotFoundException('Condominium not found!');

    this.merge(find, updateCondDto);
    return this.save(find);
  }
}

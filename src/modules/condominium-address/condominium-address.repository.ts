import { NotFoundException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { CreateCondominiumAddressDto } from './dto/create-condominium-address.dto';
import { UpdateCondominiumAddressDto } from './dto/update-condominium-address.dto';
import { CondominiumAddress } from './entities/condominium-address.entity';

@EntityRepository(CondominiumAddress)
export class CondominiumAddressRepository extends Repository<CondominiumAddress> {
  async createCondominiumAddress(
    createCondAddressDto: CreateCondominiumAddressDto,
  ) {
    const cond = this.create(createCondAddressDto);
    return this.save(cond);
  }

  async updateCondominiumAddress(
    id: string,
    updateCondAddressDto: UpdateCondominiumAddressDto,
  ) {
    const find = await this.findOne(id);

    if (!find) throw new NotFoundException('Condominium address not found!');

    this.merge(find, updateCondAddressDto);
    return this.save(find);
  }
}

import { Injectable } from '@nestjs/common';
import { CondominiumAddressRepository } from './condominium-address.repository';
import { CreateCondominiumAddressDto } from './dto/create-condominium-address.dto';
import { UpdateCondominiumAddressDto } from './dto/update-condominium-address.dto';

@Injectable()
export class CondominiumAddressService {
  constructor(
    private readonly condominiumAddressRepository: CondominiumAddressRepository,
  ) {}

  async create(createCondominiumAddressDto: CreateCondominiumAddressDto) {
    return this.condominiumAddressRepository.createCondominiumAddress(
      createCondominiumAddressDto,
    );
  }

  async findAll() {
    return this.condominiumAddressRepository.find();
  }

  async findOne(id: string) {
    return this.condominiumAddressRepository.findOne(id);
  }

  async update(
    id: string,
    updateCondominiumAddressDto: UpdateCondominiumAddressDto,
  ) {
    return this.condominiumAddressRepository.updateCondominiumAddress(
      id,
      updateCondominiumAddressDto,
    );
  }
}

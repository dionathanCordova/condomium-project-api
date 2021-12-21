import { Injectable } from '@nestjs/common';
import { CondRepository } from './condominium.repository';
import { CreateCondominiumDto } from './dto/create-condominium.dto';
import { UpdateCondominiumDto } from './dto/update-condominium.dto';

@Injectable()
export class CondominiumService {
  constructor(private readonly condRepository: CondRepository) {}

  async create(createCondominiumDto: CreateCondominiumDto) {
    return this.condRepository.createCond(createCondominiumDto);
  }

  async findAll() {
    return this.condRepository.find();
  }

  async findOne(id: string) {
    return this.condRepository.findOne(id);
  }

  async update(id: string, updateCondominiumDto: UpdateCondominiumDto) {
    return this.condRepository.updateCond(id, updateCondominiumDto);
  }
}

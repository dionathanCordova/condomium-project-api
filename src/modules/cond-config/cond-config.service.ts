import { Injectable } from '@nestjs/common';
import { CondConfigRepository } from './cond-config.repository';
import { CreateCondConfigDto } from './dto/create-cond-config.dto';
import { UpdateCondConfigDto } from './dto/update-cond-config.dto';

@Injectable()
export class CondConfigService {
  constructor(private readonly condConfigRepository: CondConfigRepository) {}

  async createConfig(createCondConfigDto: CreateCondConfigDto) {
    return this.condConfigRepository.createConfig(createCondConfigDto);
  }

  findAll(id: string) {
    return this.condConfigRepository.find({ where: { condominium_id: id } });
  }

  findOne(id: string) {
    return this.condConfigRepository.findOne({
      where: { condominium_id: id },
      order: { year: 'DESC' },
    });
  }

  update(id: string, updateCondConfigDto: UpdateCondConfigDto) {
    return this.condConfigRepository.updateConfig(id, updateCondConfigDto);
  }
}

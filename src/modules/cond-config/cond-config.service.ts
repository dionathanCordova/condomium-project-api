import { Injectable } from '@nestjs/common';
import { CondConfigRepository } from './cond-config.repository';
import { CreateCondConfigDto } from './dto/create-cond-config.dto';
import { UpdateCondConfigDto } from './dto/update-cond-config.dto';

@Injectable()
export class CondConfigService {
  constructor(private readonly condConfigRepository: CondConfigRepository) {}

  create(createCondConfigDto: CreateCondConfigDto) {
    return 'This action adds a new condConfig';
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

  update(id: number, updateCondConfigDto: UpdateCondConfigDto) {
    return `This action updates a #${id} condConfig`;
  }

  remove(id: number) {
    return `This action removes a #${id} condConfig`;
  }
}

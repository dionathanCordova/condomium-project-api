import { NotFoundException } from '@nestjs/common';
import { EntityRepository } from 'typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { CreateCondConfigDto } from './dto/create-cond-config.dto';
import { UpdateCondConfigDto } from './dto/update-cond-config.dto';
import { CondConfig } from './entities/cond-config.entity';

@EntityRepository(CondConfig)
export class CondConfigRepository extends BaseRepository<CondConfig> {
  async createConfig(createCondConfigDto: CreateCondConfigDto) {
    const findExistenceConfig = await this.find({
      where: {
        year: createCondConfigDto.year,
        condominium_id: createCondConfigDto.condominium_id,
      },
    });

    if (findExistenceConfig.length == 0) {
      const config = this.create(createCondConfigDto);
      return this.save(config);
    }
  }

  async updateConfig(id: string, updateCondConfigDto: UpdateCondConfigDto) {
    const find = await this.findOne(id);

    console.log(find);

    if (!find) {
      throw new NotFoundException('Condominium not found!');
    }

    this.merge(find, updateCondConfigDto);
    return this.save(find);
  }
}

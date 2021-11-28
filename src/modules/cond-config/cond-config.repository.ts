import { EntityRepository } from 'typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { CondConfig } from './entities/cond-config.entity';

@EntityRepository(CondConfig)
export class CondConfigRepository extends BaseRepository<CondConfig> {}

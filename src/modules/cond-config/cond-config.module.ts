import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CondConfigController } from './cond-config.controller';
import { CondConfigRepository } from './cond-config.repository';
import { CondConfigService } from './cond-config.service';

@Module({
  imports: [TypeOrmModule.forFeature([CondConfigRepository])],
  controllers: [CondConfigController],
  providers: [CondConfigService],
})
export class CondConfigModule {}

import { Module } from '@nestjs/common';
import { CondominiumService } from './condominium.service';
import { CondominiumController } from './condominium.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Condominium } from './entities/condominium.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Condominium])],
  controllers: [CondominiumController],
  providers: [CondominiumService],
})
export class CondominiumModule {}

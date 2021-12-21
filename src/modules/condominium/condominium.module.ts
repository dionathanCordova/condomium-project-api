import { Module } from '@nestjs/common';
import { CondominiumService } from './condominium.service';
import { CondominiumController } from './condominium.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CondRepository } from './condominium.repository';

@Module({
  imports: [TypeOrmModule.forFeature([CondRepository])],
  controllers: [CondominiumController],
  providers: [CondominiumService],
})
export class CondominiumModule {}

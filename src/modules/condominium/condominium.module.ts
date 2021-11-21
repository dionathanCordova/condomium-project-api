import { Module } from '@nestjs/common';
import { CondominiumService } from './condominium.service';
import { CondominiumController } from './condominium.controller';

@Module({
  controllers: [CondominiumController],
  providers: [CondominiumService]
})
export class CondominiumModule {}

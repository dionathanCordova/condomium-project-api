import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CondominiumAddressController } from './condominium-address.controller';
import { CondominiumAddressRepository } from './condominium-address.repository';
import { CondominiumAddressService } from './condominium-address.service';

@Module({
  imports: [TypeOrmModule.forFeature([CondominiumAddressRepository])],
  controllers: [CondominiumAddressController],
  providers: [CondominiumAddressService],
})
export class CondominiumAddressModule {}

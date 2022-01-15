import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApartmentExpensesController } from './apartment-expenses.controller';
import { ApartmentExpensesRepository } from './apartment-expenses.repository';
import { ApartmentExpensesService } from './apartment-expenses.service';

@Module({
  imports: [TypeOrmModule.forFeature([ApartmentExpensesRepository])],
  controllers: [ApartmentExpensesController],
  providers: [ApartmentExpensesService],
})
export class ApartmentExpensesModule {}

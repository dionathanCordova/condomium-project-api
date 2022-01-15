import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GasExpensesController } from './gas-expenses.controller';
import { GasExpensesRepository } from './gas-expenses.repository';
import { GasExpensesService } from './gas-expenses.service';

@Module({
  imports: [TypeOrmModule.forFeature([GasExpensesRepository])],
  controllers: [GasExpensesController],
  providers: [GasExpensesService],
})
export class GasExpensesModule {}

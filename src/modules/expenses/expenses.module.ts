import { Module } from '@nestjs/common';
import { ExpensesService } from './expenses.service';
import { ExpensesController } from './expenses.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExpensesRepository } from './expenses.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ExpensesRepository])],
  controllers: [ExpensesController],
  providers: [ExpensesService],
})
export class ExpensesModule {}

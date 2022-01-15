import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WaterExpensesController } from './water-expenses.controller';
import { WaterExpensesRepository } from './water-expenses.repository';
import { WaterExpensesService } from './water-expenses.service';

@Module({
  imports: [TypeOrmModule.forFeature([WaterExpensesRepository])],
  controllers: [WaterExpensesController],
  providers: [WaterExpensesService],
})
export class WaterExpensesModule {}

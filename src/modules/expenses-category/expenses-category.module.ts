import { Module } from '@nestjs/common';
import { ExpensesCategoryService } from './expenses-category.service';
import { ExpensesCategoryController } from './expenses-category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExpensesCategoryRepository } from './expences-category.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ExpensesCategoryRepository])],
  controllers: [ExpensesCategoryController],
  providers: [ExpensesCategoryService],
})
export class ExpensesCategoryModule {}

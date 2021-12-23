import { Injectable } from '@nestjs/common';
import { CreateExpensesCategoryDto } from './dto/create-expenses-category.dto';
import { UpdateExpensesCategoryDto } from './dto/update-expenses-category.dto';
import { ExpensesCategoryRepository } from './expences-category.repository';

@Injectable()
export class ExpensesCategoryService {
  constructor(
    private readonly expenseCategoryRepository: ExpensesCategoryRepository,
  ) {}

  async create(createExpensesCategoryDto: CreateExpensesCategoryDto) {
    return this.expenseCategoryRepository.createExpensesCategory(
      createExpensesCategoryDto,
    );
  }

  findAll() {
    return this.expenseCategoryRepository.findAll();
  }

  async update(
    id: string,
    updateExpensesCategoryDto: UpdateExpensesCategoryDto,
  ) {
    return this.expenseCategoryRepository.updateExpense(
      id,
      updateExpensesCategoryDto,
    );
  }

  async remove(id: string) {
    return this.expenseCategoryRepository.removeExpense(id);
  }
}

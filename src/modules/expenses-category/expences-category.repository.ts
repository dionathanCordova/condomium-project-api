import { EntityRepository } from 'typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { CreateExpensesCategoryDto } from './dto/create-expenses-category.dto';
import { UpdateExpensesCategoryDto } from './dto/update-expenses-category.dto';
import { ExpensesCategory } from './entities/expenses-category.entity';

@EntityRepository(ExpensesCategory)
export class ExpensesCategoryRepository extends BaseRepository<ExpensesCategory> {
  async findAll() {
    return this.find();
  }

  async createExpensesCategory(createUserDto: CreateExpensesCategoryDto) {
    const create = this.create(createUserDto);
    return this.save(create);
  }

  async updateExpense(
    id: string,
    updateExpensesCategoryDto: UpdateExpensesCategoryDto,
  ) {
    const expense = await this.findOne(id);

    this.merge(expense, updateExpensesCategoryDto);
    return this.save(expense);
  }

  async removeExpense(id: string) {
    const expense = await this.findOne(id);
    this.remove(expense);
    return expense;
  }
}

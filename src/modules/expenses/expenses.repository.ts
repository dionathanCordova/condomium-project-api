import { EntityRepository } from 'typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { Expenses } from './entities/expense.entity';

@EntityRepository(Expenses)
export class ExpensesRepository extends BaseRepository<Expenses> {
  async findAll(month: number, year: number) {
    return this.find({ where: { month, year } });
  }

  async getOne(id: string) {
    return this.findOne(id);
  }

  async createExpense(createExpenseDto: CreateExpenseDto) {
    const Usuarios = this.create(createExpenseDto);
    return this.save(Usuarios);
  }

  async updateExpanse(id: string, updateExpenseDto: UpdateExpenseDto) {
    const expense = await this.findOne(id);
    this.merge(expense, updateExpenseDto);
    return this.save(expense);
  }

  async removeExpanse(id: string) {
    const expanse = await this.findOne(id);
    this.remove(expanse);
    return expanse;
  }
}

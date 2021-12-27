import { Injectable } from '@nestjs/common';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { ExpensesRepository } from './expenses.repository';

@Injectable()
export class ExpensesService {
  constructor(private readonly expensesRepository: ExpensesRepository) {}

  async create(createExpenseDto: CreateExpenseDto) {
    return this.expensesRepository.createExpense(createExpenseDto);
  }

  async findAll(month: number, year: number) {
    return this.expensesRepository.findAll(month, year);
  }

  async findOne(id: string) {
    return `This action returns a #${id} expense`;
  }

  async update(id: string, updateExpenseDto: UpdateExpenseDto) {
    return this.expensesRepository.updateExpanse(id, updateExpenseDto);
  }

  async remove(id: string) {
    return this.expensesRepository.removeExpanse(id);
  }
}

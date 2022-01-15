import { NotFoundException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { CreateGasExpensesDto } from './dto/create-gas-expense.dto';
import { UpdateGasExpensesDto } from './dto/update-gas-expense.dto';
import { GasExpenses } from './entities/gas-expenses.entity';

@EntityRepository(GasExpenses)
export class GasExpensesRepository extends Repository<GasExpenses> {
  async createGasExpenses(createGasExpensesDto: CreateGasExpensesDto) {
    const findExistenceReport = await this.find({
      where: {
        month: createGasExpensesDto.month,
        year: createGasExpensesDto.year,
        condominium_id: createGasExpensesDto.condominium_id,
      },
    });

    if (findExistenceReport.length == 0) {
      const config = this.create(createGasExpensesDto);
      return this.save(config);
    }
  }

  async updateGasExpenses(
    id: string,
    updateGasExpensesDto: UpdateGasExpensesDto,
  ) {
    const find = await this.findOne(id);

    if (!find) {
      throw new NotFoundException('Gas Expense not found!');
    }

    this.merge(find, updateGasExpensesDto);
    return this.save(find);
  }
}

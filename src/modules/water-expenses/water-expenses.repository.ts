import { NotFoundException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { CreateWaterExpensesDto } from './dto/create-water-expense.dto';
import { UpdateWaterExpensesDto } from './dto/update-water-expense.dto';
import { WaterExpenses } from './entities/water-expenses.entity';

@EntityRepository(WaterExpenses)
export class WaterExpensesRepository extends Repository<WaterExpenses> {
  async createWaterExpenses(createWaterExpensesDto: CreateWaterExpensesDto) {
    const findExistenceReport = await this.find({
      where: {
        month: createWaterExpensesDto.month,
        year: createWaterExpensesDto.year,
        condominium_id: createWaterExpensesDto.condominium_id,
      },
    });

    if (findExistenceReport.length == 0) {
      const config = this.create(createWaterExpensesDto);
      return this.save(config);
    }
  }

  async updateWaterExpenses(
    id: string,
    updateWaterExpensesDto: UpdateWaterExpensesDto,
  ) {
    const find = await this.findOne(id);

    if (!find) {
      throw new NotFoundException('Water Expense not found!');
    }

    this.merge(find, updateWaterExpensesDto);
    return this.save(find);
  }
}

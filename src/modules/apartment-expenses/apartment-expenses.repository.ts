import { NotFoundException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { CreateApartmentExpensesDto } from './dto/create-apartment-expense.dto';
import { UpdateApartmentExpensesDto } from './dto/update-apartment-expense-report.dto';
import { ApartmentExpenses } from './entities/apartment-expenses.entity';

@EntityRepository(ApartmentExpenses)
export class ApartmentExpensesRepository extends Repository<ApartmentExpenses> {
  async createApartmentExpenses(
    createApartmentExpensesDto: CreateApartmentExpensesDto,
  ) {
    const findExistenceReport = await this.find({
      where: {
        month: createApartmentExpensesDto.month,
        year: createApartmentExpensesDto.year,
        condominium_id: createApartmentExpensesDto.condominium_id,
      },
    });

    if (findExistenceReport.length == 0) {
      const config = this.create(createApartmentExpensesDto);
      return this.save(config);
    }
  }

  async updateApartmentExpenses(
    id: string,
    updateApartmentExpensesDto: UpdateApartmentExpensesDto,
  ) {
    const find = await this.findOne(id);

    if (!find) {
      throw new NotFoundException('Apartment Expense not found!');
    }

    this.merge(find, updateApartmentExpensesDto);
    return this.save(find);
  }
}

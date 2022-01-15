import { Injectable, NotAcceptableException } from '@nestjs/common';
import { UpdateWaterExpensesDto } from './dto/update-water-expense.dto';
import { CreateWaterExpensesDto } from './dto/create-water-expense.dto';
import { WaterExpensesRepository } from './water-expenses.repository';

@Injectable()
export class WaterExpensesService {
  constructor(
    private readonly waterExpensesRepository: WaterExpensesRepository,
  ) {}

  async create(CreateWaterExpensesDto: CreateWaterExpensesDto) {
    const alreadyExist = await this.findOne(
      CreateWaterExpensesDto.month,
      CreateWaterExpensesDto.year,
      CreateWaterExpensesDto.condominium_id,
    );

    if (alreadyExist) {
      throw new NotAcceptableException('Water expenses already exists');
    }

    return this.waterExpensesRepository.createWaterExpenses(
      CreateWaterExpensesDto,
    );
  }

  findOne(month: number, year: number, condominium_id: string) {
    return this.waterExpensesRepository.findOne({
      where: { month, year, condominium_id },
    });
  }

  update(id: string, updateWaterExpensesDto: UpdateWaterExpensesDto) {
    return this.waterExpensesRepository.updateWaterExpenses(
      id,
      updateWaterExpensesDto,
    );
  }
}

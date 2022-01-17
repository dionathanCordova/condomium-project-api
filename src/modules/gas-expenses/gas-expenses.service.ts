import { Injectable, NotAcceptableException } from '@nestjs/common';
import { CreateGasExpensesDto } from './dto/create-gas-expense.dto';
import { UpdateGasExpensesDto } from './dto/update-gas-expense.dto';
import { GasExpensesRepository } from './gas-expenses.repository';

@Injectable()
export class GasExpensesService {
  constructor(private readonly GasExpensesRepository: GasExpensesRepository) {}

  async create(CreateGasExpensesDto: CreateGasExpensesDto) {
    const alreadyExist = await this.findOne(
      CreateGasExpensesDto.month,
      CreateGasExpensesDto.year,
      CreateGasExpensesDto.condominium_id,
    );

    if (alreadyExist) {
      throw new NotAcceptableException('Gas expenses already exists');
    }

    return this.GasExpensesRepository.createGasExpenses(CreateGasExpensesDto);
  }

  findOne(month: number, year: number, condominium_id: string) {
    return this.GasExpensesRepository.findOne({
      where: { month, year, condominium_id },
    });
  }

  update(id: string, updateGasExpensesDto: UpdateGasExpensesDto) {
    return this.GasExpensesRepository.updateGasExpenses(
      id,
      updateGasExpensesDto,
    );
  }
}


// TODO Criar user e doc swagger do mesmo
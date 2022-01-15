import { Injectable, NotAcceptableException } from '@nestjs/common';
import { ApartmentExpensesRepository } from './apartment-expenses.repository';
import { CreateApartmentExpensesDto } from './dto/create-apartment-expense.dto';
import { UpdateApartmentExpensesDto } from './dto/update-apartment-expense-report.dto';

@Injectable()
export class ApartmentExpensesService {
  constructor(
    private readonly apartmentExpensesRepository: ApartmentExpensesRepository,
  ) {}

  async create(CreateApartmentExpensesDto: CreateApartmentExpensesDto) {
    const alreadyExist = await this.findOne(
      CreateApartmentExpensesDto.month,
      CreateApartmentExpensesDto.year,
      CreateApartmentExpensesDto.condominium_id,
    );

    if (alreadyExist) {
      throw new NotAcceptableException('Apartment expenses already exists');
    }

    return this.apartmentExpensesRepository.createApartmentExpenses(
      CreateApartmentExpensesDto,
    );
  }

  findOne(month: number, year: number, condominium_id: string) {
    return this.apartmentExpensesRepository.findOne({
      where: { month, year, condominium_id },
    });
  }

  update(id: string, updateApartmentExpensesDto: UpdateApartmentExpensesDto) {
    return this.apartmentExpensesRepository.updateApartmentExpenses(
      id,
      updateApartmentExpensesDto,
    );
  }

  remove(id: string) {
    return `This action removes a #${id} expenseReport`;
  }
}

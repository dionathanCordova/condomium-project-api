import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { ApartmentExpensesService } from './apartment-expenses.service';
import { CreateApartmentExpensesDto } from './dto/create-apartment-expense.dto';
import { UpdateApartmentExpensesDto } from './dto/update-apartment-expense-report.dto';

@Controller('apartment-expenses')
export class ApartmentExpensesController {
  constructor(
    private readonly apartmentExpensesService: ApartmentExpensesService,
  ) {}

  @Post()
  create(@Body() createApartmentExpensesDto: CreateApartmentExpensesDto) {
    return this.apartmentExpensesService.create(createApartmentExpensesDto);
  }

  @Get(':month/:year/:condominium_id')
  findOne(
    @Param('month') month: number,
    @Param('year') year: number,
    @Param('condominium_id') condominium_id: string,
  ) {
    return this.apartmentExpensesService.findOne(month, year, condominium_id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateApartmentExpensesDto: UpdateApartmentExpensesDto,
  ) {
    return this.apartmentExpensesService.update(id, updateApartmentExpensesDto);
  }
}

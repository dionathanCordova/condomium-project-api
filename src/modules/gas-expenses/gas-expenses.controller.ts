import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateGasExpensesDto } from './dto/create-gas-expense.dto';
import { UpdateGasExpensesDto } from './dto/update-gas-expense.dto';
import { GasExpensesService } from './gas-expenses.service';

@Controller('gas-expenses')
@ApiTags('Gas Expenses')
export class GasExpensesController {
  constructor(private readonly gasExpensesService: GasExpensesService) {}

  @Post()
  create(@Body() createGasExpensesDto: CreateGasExpensesDto) {
    return this.gasExpensesService.create(createGasExpensesDto);
  }

  @Get(':month/:year/:condominium_id')
  findOne(
    @Param('month') month: number,
    @Param('year') year: number,
    @Param('condominium_id') condominium_id: string,
  ) {
    return this.gasExpensesService.findOne(month, year, condominium_id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateGasExpensesDto: UpdateGasExpensesDto,
  ) {
    return this.gasExpensesService.update(id, updateGasExpensesDto);
  }
}

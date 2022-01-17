import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateWaterExpensesDto } from './dto/create-water-expense.dto';
import { UpdateWaterExpensesDto } from './dto/update-water-expense.dto';
import { WaterExpensesService } from './water-expenses.service';

@Controller('water-expenses')
@ApiTags('Water Expenses')
export class WaterExpensesController {
  constructor(private readonly waterExpensesService: WaterExpensesService) {}

  @Post()
  create(@Body() createWaterExpensesDto: CreateWaterExpensesDto) {
    return this.waterExpensesService.create(createWaterExpensesDto);
  }

  @Get(':month/:year/:condominium_id')
  findOne(
    @Param('month') month: number,
    @Param('year') year: number,
    @Param('condominium_id') condominium_id: string,
  ) {
    return this.waterExpensesService.findOne(month, year, condominium_id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateWaterExpensesDto: UpdateWaterExpensesDto,
  ) {
    return this.waterExpensesService.update(id, updateWaterExpensesDto);
  }
}

import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { ExpenseReportService } from './expense-report.service';
import { CreateExpenseReportDto } from './dto/create-expense-report.dto';
import { UpdateExpenseReportDto } from './dto/update-expense-report.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('expense-report')
@ApiTags('Expense report')
export class ExpenseReportController {
  constructor(private readonly expenseReportService: ExpenseReportService) {}

  @Post()
  create(@Body() createExpenseReportDto: CreateExpenseReportDto) {
    return this.expenseReportService.create(createExpenseReportDto);
  }

  @Get(':month/:year/:condominium_id')
  findOne(
    @Param('month') month: number,
    @Param('year') year: number,
    @Param('condominium_id') condominium_id: string,
  ) {
    return this.expenseReportService.findOne(month, year, condominium_id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateExpenseReportDto: UpdateExpenseReportDto,
  ) {
    return this.expenseReportService.update(id, updateExpenseReportDto);
  }
}

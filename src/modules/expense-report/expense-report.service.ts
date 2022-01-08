import { Injectable, NotAcceptableException } from '@nestjs/common';
import { CreateExpenseReportDto } from './dto/create-expense-report.dto';
import { UpdateExpenseReportDto } from './dto/update-expense-report.dto';
import { ExpenseReportRepository } from './expense-report.repository';

@Injectable()
export class ExpenseReportService {
  constructor(
    private readonly expenseReportRepository: ExpenseReportRepository,
  ) {}

  async create(createExpenseReportDto: CreateExpenseReportDto) {
    const alreadyExist = await this.findOne(
      createExpenseReportDto.month,
      createExpenseReportDto.year,
      createExpenseReportDto.condominium_id,
    );

    if (alreadyExist) {
      throw new NotAcceptableException('Expense report already exists');
    }

    return this.expenseReportRepository.createExpenseReport(
      createExpenseReportDto,
    );
  }

  findOne(month: number, year: number, condominium_id: string) {
    return this.expenseReportRepository.findOne({
      where: { month, year, condominium_id },
    });
  }

  update(id: string, updateExpenseReportDto: UpdateExpenseReportDto) {
    return this.expenseReportRepository.updateExpenseReport(
      id,
      updateExpenseReportDto,
    );
  }

  remove(id: string) {
    return `This action removes a #${id} expenseReport`;
  }
}

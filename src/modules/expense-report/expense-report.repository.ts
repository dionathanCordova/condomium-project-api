import { NotFoundException } from '@nestjs/common';
import { EntityRepository } from 'typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { CreateExpenseReportDto } from './dto/create-expense-report.dto';
import { UpdateExpenseReportDto } from './dto/update-expense-report.dto';
import { ExpenseReport } from './entities/expense-report.entity';

@EntityRepository(ExpenseReport)
export class ExpenseReportRepository extends BaseRepository<ExpenseReport> {
  async createExpenseReport(createExpenseDto: CreateExpenseReportDto) {
    const findExistenceReport = await this.find({
      where: {
        month: createExpenseDto.month,
        year: createExpenseDto.year,
        condominium_id: createExpenseDto.condominium_id,
      },
    });

    if (findExistenceReport.length == 0) {
      const config = this.create(createExpenseDto);
      return this.save(config);
    }
  }

  async updateExpenseReport(
    id: string,
    updateExpenseDto: UpdateExpenseReportDto,
  ) {
    const find = await this.findOne(id);

    if (!find) {
      throw new NotFoundException('Expense not found!');
    }

    this.merge(find, updateExpenseDto);
    return this.save(find);
  }
}

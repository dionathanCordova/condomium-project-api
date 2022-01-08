import { Module } from '@nestjs/common';
import { ExpenseReportService } from './expense-report.service';
import { ExpenseReportController } from './expense-report.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExpenseReportRepository } from './expense-report.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ExpenseReportRepository])],
  controllers: [ExpenseReportController],
  providers: [ExpenseReportService],
})
export class ExpenseReportModule {}

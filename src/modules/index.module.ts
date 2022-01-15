import { Module } from '@nestjs/common';
import { CondConfigModule } from './cond-config/cond-config.module';
import { CondominiumModule } from './condominium/condominium.module';
import { UsersModule } from './users/users.module';
import { ApartmentsModule } from './apartments/apartments.module';
import { ExpensesCategoryModule } from './expenses-category/expenses-category.module';
import { ExpensesModule } from './expenses/expenses.module';
import { ExpenseReportModule } from './expense-report/expense-report.module';
import { GasExpensesModule } from './gas-expenses/gas-expenses.module';
import { WaterExpensesModule } from './water-expenses/water-expenses.module';
import { ApartmentExpensesModule } from './apartment-expenses/apartment-expense.module';
import { CondominiumAddressModule } from './condominium-address/condominium-address.module';

@Module({
  imports: [
    UsersModule,
    CondConfigModule,
    CondominiumModule,
    ApartmentsModule,
    ExpensesCategoryModule,
    ExpensesModule,
    ExpenseReportModule,
    GasExpensesModule,
    WaterExpensesModule,
    ApartmentExpensesModule,
    CondominiumAddressModule,
  ],
})
export class IndexModules {}

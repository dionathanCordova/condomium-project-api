import { Module } from '@nestjs/common';
import { CondConfigModule } from './cond-config/cond-config.module';
import { CondominiumModule } from './condominium/condominium.module';
import { UsersModule } from './users/users.module';
import { ApartmentsModule } from './apartments/apartments.module';
import { ExpensesCategoryModule } from './expenses-category/expenses-category.module';

@Module({
  imports: [
    UsersModule,
    CondConfigModule,
    CondominiumModule,
    ApartmentsModule,
    ExpensesCategoryModule,
  ],
})
export class IndexModules {}

import { PartialType } from '@nestjs/swagger';
import { CreateGasExpensesDto } from './create-gas-expense.dto';

export class UpdateGasExpensesDto extends PartialType(CreateGasExpensesDto) {}

import { PartialType } from '@nestjs/swagger';
import { CreateWaterExpensesDto } from './create-water-expense.dto';

export class UpdateWaterExpensesDto extends PartialType(
  CreateWaterExpensesDto,
) {}

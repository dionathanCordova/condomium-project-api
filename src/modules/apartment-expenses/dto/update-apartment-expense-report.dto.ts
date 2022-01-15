import { PartialType } from '@nestjs/swagger';
import { CreateApartmentExpensesDto } from './create-apartment-expense.dto';

export class UpdateApartmentExpensesDto extends PartialType(
  CreateApartmentExpensesDto,
) {}

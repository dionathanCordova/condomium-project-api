import { PartialType } from '@nestjs/swagger';
import { CreateExpensesCategoryDto } from './create-expenses-category.dto';

export class UpdateExpensesCategoryDto extends PartialType(
  CreateExpensesCategoryDto,
) {}

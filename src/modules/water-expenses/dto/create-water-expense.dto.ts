import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateWaterExpensesDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  previous_reading: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  current_reading: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  m3_expenses: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  total_value: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  add_value: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  month: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  year: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  condominium_id: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  apartment: string;

  @ApiProperty()
  @IsBoolean()
  @IsNotEmpty()
  confirm_expense: boolean;
}

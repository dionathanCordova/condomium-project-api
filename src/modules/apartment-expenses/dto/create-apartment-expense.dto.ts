import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateApartmentExpensesDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  water_bill: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  electricity_bill: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  cleaning_expenses: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  gas_bill: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  reserve_expenses: number;

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
  @IsNumber()
  @IsNotEmpty()
  total: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  total_debt: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  payment_status: string;
}

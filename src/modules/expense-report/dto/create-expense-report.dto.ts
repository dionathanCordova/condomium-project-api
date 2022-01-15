import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateExpenseReportDto {
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
  gas_bill: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  cash_reserve_after_bill: number;

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
}

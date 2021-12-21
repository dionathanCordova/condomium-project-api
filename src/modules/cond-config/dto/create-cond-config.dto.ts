import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateCondConfigDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  basic_water_rate: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  average_water_rate: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  high_water_rate: number;

  @ApiProperty()
  @IsNumber()
  cleaning_fee: number;

  @ApiProperty()
  @IsNumber()
  reserve_value: number;

  @ApiProperty()
  @IsNumber()
  m3_gas_value: number;

  @ApiProperty()
  @IsBoolean()
  liquidator_exempt: boolean;

  @ApiProperty()
  @IsString()
  payment_plan: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  year: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  condominium_id: string;

  @ApiProperty()
  created_at: Date;

  @ApiProperty()
  updated_at: Date;

  @ApiProperty()
  updater_id: string;
}

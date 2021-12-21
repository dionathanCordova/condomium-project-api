import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateCondominiumDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  config_id: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  count_apartments: number;
}

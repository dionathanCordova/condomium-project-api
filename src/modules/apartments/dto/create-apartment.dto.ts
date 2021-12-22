import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateApartmentDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  apartment: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  condominium_id: string;
}

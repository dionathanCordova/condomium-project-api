import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  apartment: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  telephone: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  avatar: string;

  @ApiProperty({ type: Number, description: 'Level of permision of user' })
  @IsNotEmpty()
  @IsNumber()
  permission_id: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  condominium_id: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  is_admin: boolean;

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  can_show_data: boolean;
}

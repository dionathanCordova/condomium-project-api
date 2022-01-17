import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CondominiumService } from './condominium.service';
import { CreateCondominiumDto } from './dto/create-condominium.dto';
import { UpdateCondominiumDto } from './dto/update-condominium.dto';

@Controller('condominium')
@ApiTags('Condominium')
export class CondominiumController {
  constructor(private readonly condominiumService: CondominiumService) {}

  @Post()
  create(@Body() createCondominiumDto: CreateCondominiumDto) {
    return this.condominiumService.create(createCondominiumDto);
  }

  @Get()
  findAll() {
    return this.condominiumService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.condominiumService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCondominiumDto: UpdateCondominiumDto,
  ) {
    return this.condominiumService.update(id, updateCondominiumDto);
  }
}

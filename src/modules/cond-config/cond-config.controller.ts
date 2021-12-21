import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { CondConfigService } from './cond-config.service';
import { CreateCondConfigDto } from './dto/create-cond-config.dto';
import { UpdateCondConfigDto } from './dto/update-cond-config.dto';

@Controller('cond-config')
export class CondConfigController {
  constructor(private readonly condConfigService: CondConfigService) {}

  @Post()
  create(@Body() createCondConfigDto: CreateCondConfigDto) {
    return this.condConfigService.createConfig(createCondConfigDto);
  }

  @Get('/:condominium_id')
  findAll(@Param('condominium_id') condominium_id: string) {
    return this.condConfigService.findAll(condominium_id);
  }

  @Get('/:condominium_id/last')
  findOne(@Param('condominium_id') condominium_id: string) {
    return this.condConfigService.findOne(condominium_id);
  }

  @Patch(':condominium_id')
  update(
    @Param('condominium_id') condominium_id: string,
    @Body() updateCondConfigDto: UpdateCondConfigDto,
  ) {
    return this.condConfigService.update(condominium_id, updateCondConfigDto);
  }
}

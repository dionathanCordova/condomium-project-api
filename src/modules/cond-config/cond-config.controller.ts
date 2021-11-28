import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CondConfigService } from './cond-config.service';
import { CreateCondConfigDto } from './dto/create-cond-config.dto';
import { UpdateCondConfigDto } from './dto/update-cond-config.dto';

@Controller('cond-config')
export class CondConfigController {
  constructor(private readonly condConfigService: CondConfigService) {}

  @Post()
  create(@Body() createCondConfigDto: CreateCondConfigDto) {
    return this.condConfigService.create(createCondConfigDto);
  }

  @Get()
  findAll() {
    return this.condConfigService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.condConfigService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCondConfigDto: UpdateCondConfigDto) {
    return this.condConfigService.update(+id, updateCondConfigDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.condConfigService.remove(+id);
  }
}

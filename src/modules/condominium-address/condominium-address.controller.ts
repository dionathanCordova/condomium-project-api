import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CondominiumAddressService } from './condominium-address.service';
import { CreateCondominiumAddressDto } from './dto/create-condominium-address.dto';
import { UpdateCondominiumAddressDto } from './dto/update-condominium-address.dto';

@Controller('condominium/address')
@ApiTags('condominium address')
export class CondominiumAddressController {
  constructor(
    private readonly condominiumAddressService: CondominiumAddressService,
  ) {}

  @Post()
  create(@Body() createCondominiumAddressDto: CreateCondominiumAddressDto) {
    return this.condominiumAddressService.create(createCondominiumAddressDto);
  }

  @Get()
  findAll() {
    return this.condominiumAddressService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.condominiumAddressService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCondominiumAddressDto: UpdateCondominiumAddressDto,
  ) {
    return this.condominiumAddressService.update(
      id,
      updateCondominiumAddressDto,
    );
  }
}

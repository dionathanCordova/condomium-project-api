import { PartialType } from '@nestjs/swagger';
import { CreateCondominiumAddressDto } from './create-condominium-address.dto';

export class UpdateCondominiumAddressDto extends PartialType(
  CreateCondominiumAddressDto,
) {}

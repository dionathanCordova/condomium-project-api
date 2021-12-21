import { PartialType } from '@nestjs/swagger';
import { CreateCondConfigDto } from './create-cond-config.dto';

export class UpdateCondConfigDto extends PartialType(CreateCondConfigDto) {}

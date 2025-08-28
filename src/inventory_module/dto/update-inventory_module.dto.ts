import { PartialType } from '@nestjs/swagger';
import { CreateInventoryModuleDto } from './create-inventory_module.dto';

export class UpdateInventoryModuleDto extends PartialType(CreateInventoryModuleDto) {}

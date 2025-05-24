import { Module } from '@nestjs/common';
import { InventoryModuleService } from './inventory_module.service';
import { InventoryModuleController } from './inventory_module.controller';

@Module({
  controllers: [InventoryModuleController],
  providers: [InventoryModuleService],
})
export class InventoryModuleModule {}

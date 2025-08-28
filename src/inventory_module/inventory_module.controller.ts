import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { InventoryModuleService } from './inventory_module.service';
import { CreateInventoryModuleDto } from './dto/create-inventory_module.dto';
import { UpdateInventoryModuleDto } from './dto/update-inventory_module.dto';

@Controller('inventory-module')
export class InventoryModuleController {
  constructor(private readonly inventoryModuleService: InventoryModuleService) {}

  @Post()
  create(@Body() createInventoryModuleDto: CreateInventoryModuleDto) {
    return this.inventoryModuleService.create(createInventoryModuleDto);
  }

  @Get()
  findAll() {
    return this.inventoryModuleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.inventoryModuleService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateInventoryModuleDto: UpdateInventoryModuleDto) {
    return this.inventoryModuleService.update(+id, updateInventoryModuleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.inventoryModuleService.remove(+id);
  }
}

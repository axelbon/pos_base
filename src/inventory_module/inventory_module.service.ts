import { Injectable } from '@nestjs/common';
import { CreateInventoryModuleDto } from './dto/create-inventory_module.dto';
import { UpdateInventoryModuleDto } from './dto/update-inventory_module.dto';

@Injectable()
export class InventoryModuleService {
  create(createInventoryModuleDto: CreateInventoryModuleDto) {
    return 'This action adds a new inventoryModule';
  }

  findAll() {
    return `This action returns all inventoryModule`;
  }

  findOne(id: number) {
    return `This action returns a #${id} inventoryModule`;
  }

  update(id: number, updateInventoryModuleDto: UpdateInventoryModuleDto) {
    return `This action updates a #${id} inventoryModule`;
  }

  remove(id: number) {
    return `This action removes a #${id} inventoryModule`;
  }
}

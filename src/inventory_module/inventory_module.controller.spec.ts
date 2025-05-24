import { Test, TestingModule } from '@nestjs/testing';
import { InventoryModuleController } from './inventory_module.controller';
import { InventoryModuleService } from './inventory_module.service';

describe('InventoryModuleController', () => {
  let controller: InventoryModuleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InventoryModuleController],
      providers: [InventoryModuleService],
    }).compile();

    controller = module.get<InventoryModuleController>(InventoryModuleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

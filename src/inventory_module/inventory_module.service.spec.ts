import { Test, TestingModule } from '@nestjs/testing';
import { InventoryModuleService } from './inventory_module.service';

describe('InventoryModuleService', () => {
  let service: InventoryModuleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InventoryModuleService],
    }).compile();

    service = module.get<InventoryModuleService>(InventoryModuleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

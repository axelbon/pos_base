import { Test, TestingModule } from '@nestjs/testing';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { Category } from './entities/category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { NotFoundException } from '@nestjs/common';


describe('CategoryController', () => {
  let controller: CategoryController;

  let mockService: {
    create: jest.Mock;
    findAll: jest.Mock;
    findOne: jest.Mock;
    update: jest.Mock;
    remove: jest.Mock;
  }

  const createCategoryDto: CreateCategoryDto = { name: 'Test category', description: 'Test description' };

  const category: Category = { id: '1', name: 'Test category', description: 'Test description', is_active: true, created_at: new Date(), updated_at: new Date(), deleted_at: null };

  const categoryList: Category[] = [
    { id: '1', name: 'Test category1', description: 'Test description1', is_active: true, created_at: new Date(), updated_at: new Date(), deleted_at: new Date() },
    { id: '2', name: 'Test category2', description: 'Test description2', is_active: true, created_at: new Date(), updated_at: new Date(), deleted_at: new Date() },
    { id: '3', name: 'Test category3', description: 'Test description3', is_active: true, created_at: new Date(), updated_at: new Date(), deleted_at: new Date() },
    { id: '4', name: 'Test category4', description: 'Test description4', is_active: true, created_at: new Date(), updated_at: new Date(), deleted_at: new Date() },
  ];

  const updateCategoryDto: UpdateCategoryDto = { name: 'Test category updated', description: 'Test description updated' };

  const updatedCategory: Category = { id: '1', name: 'Test category updated', description: 'Test description updated', is_active: true, created_at: new Date(), updated_at: new Date(), deleted_at: null };

  const error = new Error('error');

  const notFoundException = new NotFoundException();

  const id1 = '1';

  beforeEach(async () => {

    mockService = {
      create: jest.fn(),
      findAll: jest.fn(),
      findOne: jest.fn(),
      update: jest.fn(),
      remove: jest.fn(),
    };
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoryController],
      providers: [
        {
          provide: CategoryService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<CategoryController>(CategoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should call service.create with dto and return result', async () => {
      const result = category;

      mockService.create.mockResolvedValue(result);

      const response = await controller.create(createCategoryDto);

      expect(mockService.create).toHaveBeenCalledWith(createCategoryDto);
      expect(response).toEqual(result);

    });

    it('should throw an error if service.create fails', async () => {
      mockService.create.mockRejectedValue(error);

      await expect(controller.create(createCategoryDto)).rejects.toBe(error);

      expect(mockService.create).toHaveBeenCalledWith(createCategoryDto);
    });
  });

  describe('findAll', () => {
    it('should call service.findAll and return an array of categories', async () => {
      const result = categoryList;
      mockService.findAll.mockResolvedValue(result);

      const response = await controller.findAll();

      expect(mockService.findAll).toHaveBeenCalled();
      expect(response).toEqual(result);
    });

    it('should throw an error if service.findAll fails', async () => {
      mockService.findAll.mockRejectedValue(error);

      await expect(controller.findAll()).rejects.toBe(error);

      expect(mockService.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should call service.findOne with the provided id and return the category', async () => {
      mockService.findOne.mockResolvedValue(category);

      const response = await controller.findOne(id1);

      expect(mockService.findOne).toHaveBeenCalledWith(id1);
      expect(response).toEqual(category);
    });

    it('should throw a NotFoundException if the category does not exist', async () => {
      mockService.findOne.mockRejectedValue(notFoundException);

      await expect(controller.findOne(id1)).rejects.toBe(notFoundException);

      expect(mockService.findOne).toHaveBeenCalledWith(id1);
    });
  });

  describe('update', () => {
    it('should call service.update with the provided id and DTO and return the updated category', async () => {
      mockService.update.mockResolvedValue(updatedCategory);

      const response = await controller.update(id1, updateCategoryDto);

      expect(mockService.update).toHaveBeenCalledWith(id1, updateCategoryDto);
      expect(response).toEqual(updatedCategory);
    });

    it('should throw a NotFoundException if the category does not exist', async () => {
      mockService.update.mockRejectedValue(notFoundException);

      await expect(controller.update('2', updateCategoryDto)).rejects.toBe(notFoundException);

      expect(mockService.update).toHaveBeenCalledWith('2', updateCategoryDto);
    });

    it('should throw an error if service.update fails', async () => {
      mockService.update.mockRejectedValue(error);

      await expect(controller.update(id1, updateCategoryDto)).rejects.toBe(error);

      expect(mockService.update).toHaveBeenCalledWith(id1, updateCategoryDto);
    });
  });

  describe('remove', () => {
    it('should call service.remove with the provided id and return the deletion result', async () => {
      const deleteResult = { affected: 1, raw: {} } as any;
      mockService.remove = jest.fn().mockResolvedValue(deleteResult);

      const response = await controller.remove(id1);

      expect(mockService.remove).toHaveBeenCalledWith(id1);
      expect(response).toEqual(deleteResult);
    });

    it('should throw a NotFoundException if the category does not exist', async () => {
      mockService.remove = jest.fn().mockRejectedValue(notFoundException);

      await expect(controller.remove('999')).rejects.toBe(notFoundException);
      expect(mockService.remove).toHaveBeenCalledWith('999');
    });

    it('should propagate other errors from service.remove', async () => {
      mockService.remove = jest.fn().mockRejectedValue(error);

      await expect(controller.remove(id1)).rejects.toBe(error);
      expect(mockService.remove).toHaveBeenCalledWith(id1);
    });
  });
});

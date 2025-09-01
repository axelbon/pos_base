import { Test, TestingModule } from '@nestjs/testing';
import { CategoryService } from './category.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';

describe('CategoryService', () => {
  let service: CategoryService;
  let repo: {
    create: jest.Mock,
    find: jest.Mock,
    findOneBy: jest.Mock,
    save: jest.Mock,
    preload: jest.Mock,
    softDelete: jest.Mock,
  };

  beforeEach(async () => {
    repo = {
      create: jest.fn(),
      find: jest.fn(),
      findOneBy: jest.fn(),
      save: jest.fn(),
      preload: jest.fn(),
      softDelete: jest.fn(),
    }
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoryService,
        {
          provide: getRepositoryToken(Category),
          useValue: repo
        },
      ],
    }).compile();

    service = module.get<CategoryService>(CategoryService);
  });

  it('create, should create a category', async () => {
    const dto = {
      name: 'cat1',
      description: 'descr'
    };
    const createdCategory = { ...dto };
    const savedCategory = { id: '1', ...dto };
    repo.create.mockReturnValue(dto);
    repo.save.mockResolvedValue(savedCategory);

    const result = await service.create(dto);

    expect(repo.create).toHaveBeenCalledWith(dto);
    expect(repo.save).toHaveBeenCalledWith(createdCategory);
    expect(result).toEqual(savedCategory);
  });

  it('create, should throw an error when save fails', async () => {
    const dto = { name: 'cat', description: 'descr'};
    const createdCategory = {...dto};
    const error = new Error('error');

    repo.create.mockReturnValue(createdCategory);
    repo.save.mockRejectedValue(error);

    await expect(service.create(dto)).rejects.toBe(error);

    expect(repo.create).toHaveBeenCalledWith(dto);
    expect(repo.save).toHaveBeenCalledWith(createdCategory);
  });

  it('findAll, should return an array of categories', async () => {
    const categories = [
      { id: '1', name: 'cat1' },
      { id: '2', name: 'cat2' },
    ];
    repo.find.mockResolvedValue(categories);

    const result = await service.findAll();

    expect(result).toEqual(categories);
    expect(repo.find).toHaveBeenCalled();
  });

  it('findOne, should return a category', async () => {
    const id = '1';
    const category = {
      id: '1',
      name: 'cat1',
      description: 'descr',
    };
    repo.findOneBy.mockResolvedValue(category);

    const result = await service.findOne(id);

    expect(result).toEqual(category);
    expect(repo.findOneBy).toHaveBeenCalledWith({ id: '1' });
  });

  it('should return category not found in findOne', async () => {
    const id = '2';

    repo.findOneBy.mockResolvedValue(null);

    const result = service.findOne(id);

    await expect(result).rejects.toThrow('Category not found');
    expect(repo.findOneBy).toHaveBeenCalledWith({ id: '2' });
  });

  it('update, should update category by id', async () => {
    const id = '1';
    const dto = {
      name: 'cat1',
      description: 'descr'
    };

    repo.preload.mockResolvedValue({id, ...dto});
    repo.save.mockResolvedValue({id, ...dto});

    const result = await service.update(id, dto);
    
    expect(repo.preload).toHaveBeenCalledWith({id, ...dto});
    expect(repo.save).toHaveBeenCalledWith({id, ...dto});

    expect(result).toEqual({id, ...dto});
  });

  it('update, should return Category not found', async () => {
    const id = '1';
    const dto = { name: 'cat', description: 'descr'};

    repo.preload.mockResolvedValue(null);

    await expect(service.update(id, dto)).rejects.toThrow('Category not found');

    expect(repo.preload).toHaveBeenCalledWith({id, ...dto});
    expect(repo.save).not.toHaveBeenCalled();
  });

  it('delete, should delete category by id', async() => {
    const id = '1';
    const category = {id: '1', name: 'cat', descripcion: 'descr'};
    const softDeleteResult = { affected: 1 };
    
    repo.findOneBy.mockResolvedValue(category);
    repo.softDelete.mockResolvedValue(softDeleteResult);

    const result = await service.remove(id);

    expect(repo.findOneBy).toHaveBeenCalledWith({id});
    expect(repo.softDelete).toHaveBeenCalledWith({id});

    expect(result).toEqual(softDeleteResult);

  });

  it('delete, should return Category not found', async () => {
    const id = '1';
    repo.findOneBy.mockResolvedValue(null);

    await expect(service.remove(id)).rejects.toThrow('Category not found');

    expect(repo.findOneBy).toHaveBeenCalledWith({id});
    expect(repo.softDelete).not.toHaveBeenCalled();
  });

});

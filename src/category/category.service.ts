import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository, UpdateResult } from 'typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>
  ){}

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const category = this.categoryRepository.create(createCategoryDto);

    try {
      return await this.categoryRepository.save(category);
    } catch (error) {
      throw error;
    }
  }

  async findAll(): Promise<Category[]> {
    return await this.categoryRepository.find();
  }

  async findOne(id: string): Promise<Category> {
    const category = await this.categoryRepository.findOneBy({id});

    if(!category){
      throw new NotFoundException('Category not found');
    }

    return category;
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto): Promise<Category> {
    const category = await this.categoryRepository.preload({
      id,
      ...updateCategoryDto
    });

    if(!category){
      throw new NotFoundException('Category not found');
    }

    Object.assign(category, updateCategoryDto);

    return await this.categoryRepository.save(category);
  }

  async remove(id: string): Promise<UpdateResult> {
    const category = await this.categoryRepository.findOneBy({id});

    if(!category){
      throw new NotFoundException('Product not found');
    }

    return await this.categoryRepository.softDelete({id});
  }
}

import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UpdateResult } from 'typeorm';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @ApiOperation({summary: 'Create category'})
  @ApiResponse({status: 200, description: 'Category created successfully', type: Category})
  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto): Promise<Category> {
    return this.categoryService.create(createCategoryDto);
  }

  @ApiOperation({summary: 'FInd all categories'})
  @ApiResponse({status: 200, description: 'Find all category records', type: [Category]})
  @Get()
  findAll(): Promise<Category[]> {
    return this.categoryService.findAll();
  }

  @ApiOperation({summary: 'Find one category with given id'})
  @ApiResponse({status: 200, description: 'Find one category with given id', type: Category})
  @ApiResponse({status: 404, description: 'Category not found'})
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Category> {
    return this.categoryService.findOne(id);
  }

  @ApiOperation({summary: 'Updates category with given id'})
  @ApiResponse({status: 200, description: 'Category updated', type: Category})
  @ApiResponse({status: 404, description: 'Category not found'})
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoryService.update(id, updateCategoryDto);
  }

  @ApiOperation({summary: 'Deletes category'})
  @ApiResponse({status: 200, description: 'Category deleted'})
  @ApiResponse({status: 404, description: 'Category not found'})
  @Delete(':id')
  remove(@Param('id') id: string): Promise<UpdateResult> {
    return this.categoryService.remove(id);
  }
}

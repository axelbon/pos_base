import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UpdateResult } from 'typeorm';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}


  @ApiOperation({summary: 'Create product'})
  @ApiResponse({status: 200, description: 'Product created succesfully', type: Product})
  @Post()
  create(@Body() createProductDto: CreateProductDto): Promise<Product> {
    return this.productService.create(createProductDto);
  }

  @ApiOperation({summary: 'Find all products'})
  @ApiResponse({status: 200, description: 'Find all products records', type: [Product]})
  @Get()
  findAll(): Promise<Product[]> {
    return this.productService.findAll();
  }

  @ApiOperation({summary: 'Finds one product with given id'})
  @ApiResponse({status: 200, description: 'Finds one product with given id', type: Product})
  @ApiResponse({status: 404, description: 'Product not found'})
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Product> {
    return this.productService.findOne(id);
  }

  @ApiOperation({summary: 'Updates product with given id'})
  @ApiResponse({status: 200, description: 'Product updated', type: Product})
  @ApiResponse({status: 404, description: 'Product not found'})
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(id, updateProductDto);
  }

  @ApiOperation({summary: 'Deletes product'})
  @ApiResponse({status: 200, description: 'Product deleted.'})
  @ApiResponse({status: 404, description: 'Product not found.'})
  @Delete(':id')
  remove(@Param('id') id: string): Promise<UpdateResult> {
    return this.productService.remove(id);
  }
}

import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsInt, IsNotEmpty, IsNumberString, IsOptional, IsPositive, IsString, Min } from "class-validator";

export class CreateProductDto {
  @ApiProperty({ example: "Coca Cola", description: "Product name" })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: "SKU123", description: "Stock Keeping Unit" })
  @IsString()
  @IsNotEmpty()
  sku: string;

  @ApiProperty({ example: "Soda 355ml", description: "Product description" })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ example: "15.50", description: "Product price" })
  @IsNumberString({ no_symbols: true })
  @IsNotEmpty()
  price: string;

  @ApiProperty({ example: "10.00", description: "Product cost" })
  @IsNumberString({ no_symbols: true })
  @IsNotEmpty()
  cost: string;

  @ApiProperty({ example: 100, description: "Stock quantity" })
  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  stock: number;

  @ApiProperty({ example: 10, description: "Minimum stock" })
  @IsInt()
  @Min(0)
  @IsNotEmpty()
  min_stock: number;

  @ApiProperty({ example: 200, description: "Maximum stock" })
  @IsInt()
  @Min(0)
  @IsOptional()
  max_stock?: number;

  @ApiProperty({ example: "1234567890123", description: "Barcode" })
  @IsString()
  @IsNotEmpty()
  barcode: string;

  @ApiProperty({ example: "uuid-category", description: "Category ID" })
  @IsString()
  @IsNotEmpty()
  category_id: string;

  @ApiProperty({ example: "uuid-brand", description: "Brand ID" })
  @IsString()
  @IsNotEmpty()
  brand_id: string;

  @ApiProperty({ example: "uuid-company", description: "Company ID" })
  @IsString()
  @IsNotEmpty()
  company_id: string;

  @ApiProperty({ example: true, description: "Is active", required: false })
  @IsBoolean()
  @IsOptional()
  is_active?: boolean;

}

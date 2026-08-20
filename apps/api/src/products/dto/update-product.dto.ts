import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsNotEmpty, IsNumber, Min, IsInt, IsUrl } from 'class-validator';

export class UpdateProductDto {
  @ApiPropertyOptional({ example: 'Wireless Mouse', description: 'Product name' })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name?: string;

  @ApiPropertyOptional({ example: 'Ergonomic 2.4GHz wireless mouse', description: 'Detailed description' })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  description?: string;

  @ApiPropertyOptional({ example: 24.99, description: 'Price in EUR' })
  @IsOptional()
  @IsNumber()
  @Min(0.01)
  price?: number;

  @ApiPropertyOptional({ example: 50, description: 'Stock quantity' })
  @IsOptional()
  @IsInt()
  @Min(0)
  stock?: number;

  @ApiPropertyOptional({ example: 'https://picsum.photos/seed/mouse/600/600', description: 'Product image URL' })
  @IsOptional()
  @IsUrl()
  imageUrl?: string;

  @ApiPropertyOptional({ description: 'ID of the category this product belongs to' })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  categoryId?: string;
}
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber, Min, IsInt, IsOptional, IsUrl } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({ example: 'Wireless Mouse', description: 'Product name' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'Ergonomic 2.4GHz wireless mouse', description: 'Detailed description' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ example: 24.99, description: 'Price in EUR' })
  @IsNumber()
  @Min(0.01)
  price: number;

  @ApiPropertyOptional({ example: 50, description: 'Stock quantity' })
  @IsInt()
  @Min(0)
  @IsOptional()
  stock?: number;

  @ApiPropertyOptional({ example: 'https://picsum.photos/seed/mouse/600/600', description: 'Product image URL' })
  @IsUrl()
  @IsOptional()
  imageUrl?: string;

  @ApiProperty({ description: 'ID of the category this product belongs to' })
  @IsString()
  @IsNotEmpty()
  categoryId: string;
}
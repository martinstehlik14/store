import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString, Max, Min } from 'class-validator';

export class AddCartItemDto {
  @ApiProperty({ example: '3f5c6e7d-...', description: 'Product ID to add' })
  @IsString()
  @IsNotEmpty()
  productId: string;

  @ApiProperty({ example: 2, description: 'Quantity (min 1)', minimum: 1 })
  @IsInt()
  @Min(1)
  quantity: number;
}
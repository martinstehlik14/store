import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, Min } from 'class-validator';

export class UpdateCartItemDto {
  @ApiProperty({ example: 5, description: 'New quantity (min 1)', minimum: 1 })
  @IsInt()
  @Min(1)
  @IsOptional()
  quantity?: number;
}
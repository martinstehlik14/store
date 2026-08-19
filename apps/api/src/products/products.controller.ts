import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, ValidationPipe } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Get('featured')
  findFeatured() {
    return this.productsService.findFeatured();
  }

  @Get(':slug')
  findOne(@Param('slug') slug: string) {
    return this.productsService.findOne(slug);
  }

  @Post()
  create(@Body(new ValidationPipe({ transform: true })) dto: CreateProductDto) {
    return this.productsService.create(dto);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body(new ValidationPipe({ transform: true })) dto: UpdateProductDto,
  ) {
    return this.productsService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: string) {
    await this.productsService.remove(id);
  }
}

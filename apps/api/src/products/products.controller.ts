import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, ValidationPipe } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  getProducts() {
    return this.productsService.getProducts();
  }

  @Get('featured')
  getFeatured() {
    return this.productsService.getFeatured();
  }

  @Get(':slug')
  getProductBySlug(@Param('slug') slug: string) {
    return this.productsService.getProductBySlug(slug);
  }

  @Post()
  addProduct(@Body(new ValidationPipe({ transform: true })) dto: CreateProductDto) {
    return this.productsService.addProduct(dto);
  }

  @Patch(':id')
  updateProduct(
    @Param('id') id: string,
    @Body(new ValidationPipe({ transform: true })) dto: UpdateProductDto,
  ) {
    return this.productsService.updateProduct(id, dto);
  }

  @Delete(':id')
  @HttpCode(204)
  async removeProduct(@Param('id') id: string) {
    await this.productsService.removeProduct(id);
  }
}

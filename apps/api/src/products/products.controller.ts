import { Body, Controller, Get, Post, ValidationPipe } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  getProducts() {
    return this.productsService.getProducts();
  }

  @Post()
  addProduct(@Body(new ValidationPipe({ transform: true })) dto: CreateProductDto) {
    return this.productsService.addProduct(dto);
  }
}

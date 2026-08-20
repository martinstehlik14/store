import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, Req, UseGuards, ValidationPipe } from '@nestjs/common';
import type { Request } from 'express';
import { CartService } from './cart.service';
import { AddCartItemDto } from './dto/add-cart-item.dto';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';
import { AuthGuard } from '../auth/auth.guard';

@Controller('cart')
@UseGuards(AuthGuard)
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get()
  getCart(@Req() req: Request) {
    return this.cartService.getCart(req.user!.sub);
  }

  @Post('items')
  addItem(
    @Req() req: Request,
    @Body(new ValidationPipe({ transform: true })) dto: AddCartItemDto,
  ) {
    return this.cartService.addItem(req.user!.sub, dto);
  }

  @Patch('items/:id')
  updateItem(
    @Req() req: Request,
    @Param('id') id: string,
    @Body(new ValidationPipe({ transform: true })) dto: UpdateCartItemDto,
  ) {
    return this.cartService.updateItem(req.user!.sub, id, dto);
  }

  @Delete('items/:id')
  @HttpCode(204)
  async removeItem(@Req() req: Request, @Param('id') id: string) {
    await this.cartService.removeItem(req.user!.sub, id);
  }
}
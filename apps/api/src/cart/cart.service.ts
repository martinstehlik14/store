import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AddCartItemDto } from './dto/add-cart-item.dto';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';

@Injectable()
export class CartService {
  constructor(private readonly prisma: PrismaService) {}

  async getCart(userId: string) {
    const items = await this.prisma.cartItem.findMany({
      where: { userId },
      include: {
        product: {
          select: {
            id: true,
            name: true,
            slug: true,
            price: true,
            imageUrl: true,
            stock: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    const total = items.reduce(
      (sum, item) => sum + Number(item.product.price) * item.quantity,
      0,
    );

    return {
      items: items.map((item) => ({
        id: item.id,
        quantity: item.quantity,
        product: item.product,
        itemTotal: Number(item.product.price) * item.quantity,
      })),
      total,
    };
  }

  async addItem(userId: string, dto: AddCartItemDto) {
    const product = await this.prisma.product.findUnique({
      where: { id: dto.productId },
      select: { id: true, stock: true },
    });

    if (!product) {
      throw new NotFoundException(`Product with id '${dto.productId}' not found`);
    }

    const existing = await this.prisma.cartItem.findUnique({
      where: { userId_productId: { userId, productId: dto.productId } },
    });
    const newQuantity = (existing?.quantity ?? 0) + dto.quantity;

    if (newQuantity > product.stock) {
      throw new NotFoundException(`Not enough stock (available: ${product.stock})`);
    }

    return this.prisma.cartItem.upsert({
      where: { userId_productId: { userId, productId: dto.productId } },
      create: { userId, productId: dto.productId, quantity: dto.quantity },
      update: { quantity: newQuantity },
    });
  }

  async updateItem(userId: string, itemId: string, dto: UpdateCartItemDto) {
    const item = await this.prisma.cartItem.findUnique({
      where: { id: itemId },
      include: { product: { select: { stock: true } } },
    });

    if (!item) {
      throw new NotFoundException(`Cart item with id '${itemId}' not found`);
    }

    if (item.userId !== userId) {
      throw new ForbiddenException('You can only modify your own cart');
    }

    const quantity = dto.quantity ?? item.quantity;
    if (quantity > item.product.stock) {
      throw new NotFoundException(`Not enough stock (available: ${item.product.stock})`);
    }

    return this.prisma.cartItem.update({
      where: { id: itemId },
      data: { quantity },
    });
  }

  async removeItem(userId: string, itemId: string) {
    const item = await this.prisma.cartItem.findUnique({ where: { id: itemId } });

    if (!item) {
      throw new NotFoundException(`Cart item with id '${itemId}' not found`);
    }

    if (item.userId !== userId) {
      throw new ForbiddenException('You can only modify your own cart');
    }

    await this.prisma.cartItem.delete({ where: { id: itemId } });
  }
}
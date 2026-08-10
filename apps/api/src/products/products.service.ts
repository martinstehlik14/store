import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

function slugify(name: string): string {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  getProducts() {
    return this.prisma.product.findMany({
      select: {
        id: true,
        name: true,
        description: true,
        price: true,
        category: { select: { id: true, name: true, slug: true } },
      },
    });
  }

  addProduct(dto: CreateProductDto) {
    return this.prisma.product.create({
      data: {
        ...dto,
        slug: slugify(dto.name),
      },
    });
  }

  async getProductBySlug(slug: string) {
    const product = await this.prisma.product.findUnique({
      where: { slug },
      include: {
        category: true,
      },
    });

    if (!product) {
      throw new NotFoundException(`Product with slug '${slug}' not found`);
    }

    const related = await this.prisma.product.findMany({
      where: {
        categoryId: product.categoryId,
        id: { not: product.id },
      },
      select: {
        id: true,
        name: true,
        slug: true,
        price: true,
        imageUrl: true,
      },
      take: 4,
    });

    return { ...product, related };
  }

  async updateProduct(id: string, dto: UpdateProductDto) {
    const product = await this.prisma.product.findUnique({ where: { id } });

    if (!product) {
      throw new NotFoundException(`Product with id '${id}' not found`);
    }

    return this.prisma.product.update({
      where: { id },
      data: {
        ...dto,
        ...(dto.name ? { slug: slugify(dto.name) } : {}),
      },
    });
  }

  async removeProduct(id: string) {
    const product = await this.prisma.product.findUnique({ where: { id } });

    if (!product) {
      throw new NotFoundException(`Product with id '${id}' not found`);
    }

    await this.prisma.product.delete({ where: { id } });
  }
}

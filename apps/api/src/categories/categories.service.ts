import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CategoriesService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.category.findMany({
      select: {
        id: true,
        name: true,
        slug: true,
        _count: { select: { products: true } },
      },
      orderBy: { name: 'asc' },
    });
  }

  findOne(slug: string) {
    return this.prisma.category.findUnique({
      where: { slug },
      include: {
        products: {
          select: {
            id: true,
            name: true,
            slug: true,
            price: true,
            imageUrl: true,
          },
          orderBy: { createdAt: 'desc' },
        },
      },
    });
  }
}

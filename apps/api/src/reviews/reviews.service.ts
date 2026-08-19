import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '../../generated/prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateReviewDto } from './dto/create-review.dto';

@Injectable()
export class ReviewsService {
  constructor(private readonly prisma: PrismaService) {}

  async findByProduct(slug: string) {
    const product = await this.prisma.product.findUnique({
      where: { slug },
      select: { id: true },
    });

    if (!product) {
      throw new NotFoundException(`Product with slug '${slug}' not found`);
    }

    return this.prisma.review.findMany({
      where: { productId: product.id },
      select: {
        id: true,
        rating: true,
        comment: true,
        createdAt: true,
        user: { select: { id: true, name: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async create(productId: string, userId: string, dto: CreateReviewDto) {
    const product = await this.prisma.product.findUnique({
      where: { id: productId },
      select: { id: true },
    });

    if (!product) {
      throw new NotFoundException(`Product with id '${productId}' not found`);
    }

    try {
      return await this.prisma.review.create({
        data: {
          rating: dto.rating,
          comment: dto.comment,
          userId,
          productId,
        },
        select: {
          id: true,
          rating: true,
          comment: true,
          createdAt: true,
        },
      });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === 'P2002') {
        throw new ConflictException('You have already reviewed this product');
      }
      throw e;
    }
  }
}

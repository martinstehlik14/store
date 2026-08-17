import { Body, Controller, Get, Param, Post, ValidationPipe } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';

@Controller('products')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Get(':slug/reviews')
  findByProduct(@Param('slug') slug: string) {
    return this.reviewsService.findByProduct(slug);
  }

  @Post(':id/reviews')
  create(
    @Param('id') id: string,
    @Body(new ValidationPipe({ transform: true })) dto: CreateReviewDto,
  ) {
    return this.reviewsService.create(id, 'demo-customer', dto);
  }
}

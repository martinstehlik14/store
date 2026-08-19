import { Body, Controller, Get, Param, Post, Req, UseGuards, ValidationPipe } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { AuthGuard } from '../auth/auth.guard';

@Controller('products')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Get(':slug/reviews')
  findByProduct(@Param('slug') slug: string) {
    return this.reviewsService.findByProduct(slug);
  }

  @Post(':id/reviews')
  @UseGuards(AuthGuard)
  create(
    @Param('id') id: string,
    @Body(new ValidationPipe({ transform: true })) dto: CreateReviewDto,
    @Req() req: { user: { sub: string } },
  ) {
    return this.reviewsService.create(id, req.user.sub, dto);
  }
}
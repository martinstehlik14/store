import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
import { CategoriesModule } from './categories/categories.module';
import { ReviewsModule } from './reviews/reviews.module';

@Module({
  imports: [PrismaModule, ProductsModule, UsersModule, CategoriesModule, ReviewsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

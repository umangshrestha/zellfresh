import { Module } from '@nestjs/common';
import { PrismaModule } from '../common/prisma/prisma.module';
import { ProductsModule } from '../products/products.module';
import { CategoriesResolver } from './categories.resolver';
import { CategoriesService } from './categories.service';

@Module({
  providers: [CategoriesResolver, CategoriesService],
  imports: [PrismaModule, ProductsModule],
  exports: [CategoriesService],
})
export class CategoriesModule {}

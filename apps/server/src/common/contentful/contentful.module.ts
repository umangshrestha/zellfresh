import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CategoriesModule } from '../../categories/categories.module';
import { ProductsModule } from '../../products/products.module';
import { PrismaModule } from '../prisma/prisma.module';
import { ContentfulService } from './contentful.service';
import { ContentfulController } from './contentful.controller';

@Module({
  imports: [
    ConfigModule,
    PrismaModule,
    ProductsModule,
    ContentfulModule,
    CategoriesModule,
  ],
  providers: [ConfigService, ContentfulService],
  exports: [ContentfulService],
  controllers: [ContentfulController],
})
export class ContentfulModule {}

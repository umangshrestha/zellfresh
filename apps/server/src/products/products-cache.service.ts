import { Injectable } from '@nestjs/common';
import { convert_date_to_string } from '../common/get-date-time';
import { PrismaService } from '../common/prisma/prisma.service';
import { ReviewsService } from '../reviews/reviews.service';
import { FilterProductsArgs } from './dto/filter-product.args';
import { PutProductInput } from './dto/put-product.input';
import { PaginatedProduct } from './entities/paginated-product.entry';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsCacheService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly reviewsService: ReviewsService,
  ) {}

  async checkIfCategoryExists(category: string): Promise<boolean> {
    return !!(await this.prismaService.product.findFirst({
      where: { category, availableQuantity: { gt: 0 } },
    }));
  }

  put(item: PutProductInput) {
    return this.prismaService.product.upsert({
      where: { productId: item.productId },
      create: { ...item, tags: item.tags.join(',') },
      update: { ...item, tags: item.tags.join(',') },
    });
  }

  async getPrice(productId: string) {
    const data = await this.prismaService.product.findUnique({
      where: { productId, availableQuantity: { gt: 0 } },
      select: { price: true },
    });
    return data?.price || 0;
  }

  async findAll({
    limit = 20,
    cursor,
    category,
    minPrice,
    maxPrice,
    maxRating,
    minRating,
    name,
    tags,
    sortBy,
    sortAsc,
    showOutOfStock,
  }: FilterProductsArgs): Promise<PaginatedProduct> {
    const query = {
      where: {
        category: category ? { equals: category } : undefined,
        price: {
          gte: minPrice,
          lte: maxPrice,
        },
        name: name ? { contains: name } : undefined,
        availableQuantity: showOutOfStock ? undefined : { gt: 0 },
      },
      orderBy: {
        [sortBy]: sortAsc ? 'asc' : 'desc',
      },
      take: limit,
      skip: cursor ? 1 : 0,
      cursor: cursor ? { productId: cursor } : undefined,
    };
    if (sortBy === 'rating') {
      delete query.orderBy;
    }
    const data = await this.prismaService.product.findMany(query);

    let items = await Promise.all(
      data.map(async (product) => {
        const rating = await this.reviewsService.getRating(product.productId);
        if (
          (minRating && rating.rating < minRating) ||
          (maxRating && rating.rating > maxRating)
        ) {
          return null;
        }
        const newProduct: Product = {
          ...product,
          tags: product.tags.split(','),
          createdAt: convert_date_to_string(product.createdAt),
          updatedAt: convert_date_to_string(product.updatedAt),
          reviews: [],
          rating,
        };
        if (tags && tags.length > 0) {
          for (const tag of tags) {
            if (!product.tags.includes(tag)) {
              return null;
            }
          }
        }
        return newProduct;
      }),
    );
    items = items.filter((item) => item !== null);
    if (sortBy === 'rating') {
      items.sort((a, b) => {
        if (a.rating.rating < b.rating.rating) {
          return sortAsc ? -1 : 1;
        }
        if (a.rating.rating > b.rating.rating) {
          return sortAsc ? 1 : -1;
        }
        return 0;
      });
    }
    return {
      items,
      pagination: {
        limit,
        next: data.length === limit ? data[data.length - 1].productId : null,
      },
    };
  }

  async findOne(productId: string) {
    const data = await this.prismaService.product.findUnique({
      where: { productId },
    });

    if (!data) {
      return null;
    }
    return {
      ...data,
      tags: data.tags.split(','),
      createdAt: convert_date_to_string(data.createdAt),
      updatedAt: convert_date_to_string(data.updatedAt),
    };
  }

  async remove(productId: string) {
    try {
      // Delete from Prisma
      await this.prismaService.product.delete({
        where: { productId },
      });
      return productId;
    } catch (error) {
      return false;
    }
  }
}

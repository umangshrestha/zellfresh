import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma/prisma.service';
import { PutCategoryInput } from './dto/put-category.input';

@Injectable()
export class CategoriesService {
  constructor(private readonly prismaService: PrismaService) {}

  put(putCategoryInput: PutCategoryInput) {
    return this.prismaService.categories.upsert({
      where: { name: putCategoryInput.name },
      create: putCategoryInput,
      update: putCategoryInput,
    });
  }

  findAll() {
    return this.prismaService.categories.findMany({
      orderBy: { name: 'asc' },
    });
  }

  findOne(name: string) {
    return this.prismaService.categories.findUnique({
      where: { name },
    });
  }

  async remove(name: string) {
    try {
      await this.prismaService.categories.delete({
        where: { name },
      });
      return true;
    } catch (error) {
      return false;
    }
  }
}

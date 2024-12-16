import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../common/prisma/prisma.service';
import { CategoriesService } from './categories.service';
import { PutCategoryInput } from './dto/put-category.input';

describe('CategoriesService', () => {
  let service: CategoriesService;
  let prismaService: PrismaService;
  const input: PutCategoryInput = {
    name: 'Test Category',
    icon: 'Test Icon',
    imageUrl: 'Test Image URL',
    navigateUrl: 'Test Navigate URL',
  };

  const result = {
    ...input,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoriesService,
        {
          provide: PrismaService,
          useValue: {
            categories: {
              upsert: jest.fn(),
              findMany: jest.fn(),
              findUnique: jest.fn(),
              delete: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<CategoriesService>(CategoriesService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create or update a category', async () => {
    jest.spyOn(prismaService.categories, 'upsert').mockResolvedValue(result);

    expect(await service.put(input)).toEqual(result);
    expect(prismaService.categories.upsert).toHaveBeenCalledWith({
      where: { name: input.name },
      create: input,
      update: input,
    });
  });

  it('should find all categories', async () => {
    jest
      .spyOn(prismaService.categories, 'findMany')
      .mockResolvedValue([result]);

    expect(await service.findAll()).toEqual([result]);
    expect(prismaService.categories.findMany).toHaveBeenCalledWith({
      orderBy: { name: 'asc' },
    });
  });

  it('should find one category by name', async () => {
    jest
      .spyOn(prismaService.categories, 'findUnique')
      .mockResolvedValue(result);

    expect(await service.findOne('Test Category')).toEqual(result);
    expect(prismaService.categories.findUnique).toHaveBeenCalledWith({
      where: { name: 'Test Category' },
    });
  });

  it('should delete a category by name', async () => {
    jest.spyOn(prismaService.categories, 'delete').mockResolvedValue(result);

    expect(await service.remove('Test Category')).toBe(true);
    expect(prismaService.categories.delete).toHaveBeenCalledWith({
      where: { name: 'Test Category' },
    });
  });

  it('should return false when deleting a non-existing category', async () => {
    jest
      .spyOn(prismaService.categories, 'delete')
      .mockRejectedValue(new Error('Not found'));

    expect(await service.remove('Non-existing Category')).toBe(false);
    expect(prismaService.categories.delete).toHaveBeenCalledWith({
      where: { name: 'Non-existing Category' },
    });
  });
});

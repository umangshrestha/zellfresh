import { Test, TestingModule } from '@nestjs/testing';
import { DynamodbService } from 'src/common/dynamodb/dynamodb.service';
import { ProductsService } from 'src/products/products.service';
import { CategoriesResolver } from './categories.resolver';
import { CategoriesService } from './categories.service';
import { PutCategoryInput } from './dto/put-category.input';

describe('CategoriesResolver', () => {
  let resolver: CategoriesResolver;
  let service: CategoriesService;

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
        CategoriesResolver,
        {
          provide: CategoriesService,
          useValue: {
            put: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            remove: jest.fn(),
          },
        },
        {
          provide: ProductsService,
          useValue: {
            checkIfCategoryExists: jest.fn(),
          },
        },
        {
          provide: DynamodbService,
          useValue: {
            getItem: jest.fn(),
            putItem: jest.fn(),
            deleteItem: jest.fn(),
          },
        },
      ],
    }).compile();

    resolver = module.get<CategoriesResolver>(CategoriesResolver);
    service = module.get<CategoriesService>(CategoriesService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('should find all categories', async () => {
    jest.spyOn(service, 'findAll').mockResolvedValue([result]);
    expect(await resolver.findAll()).toEqual([result]);
    expect(service.findAll).toHaveBeenCalled();
  });

  it('should find one category by name', async () => {
    jest.spyOn(service, 'findOne').mockResolvedValue(result);

    expect(await resolver.findOne('Test Category')).toEqual(result);
    expect(service.findOne).toHaveBeenCalledWith('Test Category');
  });
});

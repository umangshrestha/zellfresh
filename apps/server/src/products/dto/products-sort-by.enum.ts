import { registerEnumType } from '@nestjs/graphql';

export enum ProductsSortBy {
  NAME = 'name',
  PRICE = 'price',
  RATING = 'rating',
}

registerEnumType(ProductsSortBy, {
  name: 'ProductsSortBy',
  description: 'Sort products by',
});

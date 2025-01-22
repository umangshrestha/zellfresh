import { SplitButtonType } from '@/components/SplitButton/SplitButton.types';
import { ProductPageOrderBy } from './ProductFilter.types';

export const ProductOrderOptions: SplitButtonType<ProductPageOrderBy>[] = [
  {
    label: 'Name: A to Z',
    value: {
      sortBy: 'NAME',
      sortAsc: true,
    },
  },
  {
    label: 'Name: Z to A',
    value: {
      sortBy: 'NAME',
      sortAsc: false,
    },
  },
  {
    label: 'Price: Low to High',
    value: {
      sortBy: 'PRICE',
      sortAsc: true,
    },
  },
  {
    label: 'Price: High to Low',
    value: {
      sortBy: 'PRICE',
      sortAsc: false,
    },
  },
  {
    label: 'Rating: Low to High',
    value: {
      sortBy: 'RATING',
      sortAsc: true,
    },
  },
  {
    label: 'Rating: High to Low',
    value: {
      sortBy: 'RATING',
      sortAsc: false,
    },
  },
];

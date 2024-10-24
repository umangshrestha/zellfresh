import { SplitButtonType } from '../../SplitButton/SplitButton.types';
import { ProductPageOrderBy } from './ProductFilter.types';

export const ProuctOrderOptions: SplitButtonType<ProductPageOrderBy>[] = [
  {
    label: 'Name: A to Z',
    value: {
      sortBy: 'name',
      sortAsc: true,
    },
  },
  {
    label: 'Name: Z to A',
    value: {
      sortBy: 'name',
      sortAsc: false,
    },
  },
  {
    label: 'Price: Low to High',
    value: {
      sortBy: 'price',
      sortAsc: true,
    },
  },
  {
    label: 'Price: High to Low',
    value: {
      sortBy: 'price',
      sortAsc: false,
    },
  },
  {
    label: 'Rating: Low to High',
    value: {
      sortBy: 'rating',
      sortAsc: true,
    },
  },
  {
    label: 'Rating: High to Low',
    value: {
      sortBy: 'rating',
      sortAsc: false,
    },
  },
];

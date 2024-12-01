import type { Meta, StoryObj } from '@storybook/react';
import { ProductPage } from './ProductPage';

const meta = {
  title: 'Product/List',
  component: ProductPage,
  tags: ['autodocs'],
} as Meta<typeof ProductPage>;

export default meta;
type Story = StoryObj<typeof meta>;

const data = {
  products: {
    pagination: {
      next: null,
    },
    items: [
      {
        productId: '1731039971972',
        name: 'Beef  Chops (Phal)',
        imageUrl:
          'https://proteinfresh.in/wp-content/uploads/2021/07/Beef-Marinated-Chops-Phal-300x200.png',
        description: 'Marinated beef chops, ready for grilling.',
        price: 14.99,
        unit: '500 gm',
        availableQuantity: 6,
        limitPerTransaction: 10,
        category: 'beef',
        rating: {
          rating: 0,
          count: 0,
        },
        badgeText: 'New',
      },
      {
        productId: '1731039366725',
        name: 'Beef Chunk',
        imageUrl:
          'https://proteinfresh.in/wp-content/uploads/2020/06/Beef-Boneless-Fatless-Chunk-300x200.jpg',
        description: 'Chunky boneless beef pieces, great for stews.',
        price: 10,
        unit: '500 gm',
        availableQuantity: 5,
        limitPerTransaction: 10,
        category: 'beef',
        rating: {
          rating: 0,
          count: 0,
        },
        badgeText: '',
      },
      {
        productId: '1731039971969',
        name: 'Beef Cut',
        imageUrl:
          'https://proteinfresh.in/wp-content/uploads/2020/06/Beef-Boneless-Fatless-Curry-Cut-300x200.jpg',
        description: 'Boneless curry cut for flavorful dishes.',
        price: 15.99,
        unit: '500 gm',
        availableQuantity: 8,
        limitPerTransaction: 10,
        category: 'beef',
        rating: {
          rating: 0,
          count: 0,
        },
        badgeText: '',
      },
      {
        productId: '1731039366727',
        name: 'Beef Minces (Kheema)',
        imageUrl:
          'https://proteinfresh.in/wp-content/uploads/2020/06/Beef-Boneless-Fatless-Minces-Kheema-300x200.jpg',
        description: 'Lean minced beef, perfect for kheema.',
        price: 8.99,
        unit: '500 gm',
        availableQuantity: 21,
        limitPerTransaction: 10,
        category: 'beef',
        rating: {
          rating: 0,
          count: 0,
        },
        badgeText: '',
      },
      {
        productId: '1731039971967',
        name: 'Ground Beef',
        imageUrl:
          'https://www.instacart.com/image-server/932x932/filters:fill(FFF,true):format(webp)/www.instacart.com/assets/domains/product-image/file/large_e7cf0dad-b055-4a12-9acb-ac2f033d318c.png',
        description: 'Lean ground beef for burgers or tacos.',
        price: 8.99,
        unit: '500 gm',
        availableQuantity: 21,
        limitPerTransaction: 10,
        category: 'beef',
        rating: {
          rating: 0,
          count: 0,
        },
        badgeText: '',
      },
    ],
  },
};

export const Default: Story = {
  args: {
    data,
    loading: false,
    error: null,
    onAddItemToCart: () => {},
  },
};

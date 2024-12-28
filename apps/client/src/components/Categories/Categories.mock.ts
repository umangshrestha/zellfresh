import { ListCategoriesQuery } from '@repo/api-client/dist/__generated__/graphql';

export const CATEGORIES_MOCK_DATA: ListCategoriesQuery['categories'] = [
  {
    name: 'chicken',
    icon: '🐔',
    isAvailable: true,
    imageUrl:
      'https://media.istockphoto.com/id/858959854/photo/christmas-or-thanksgiving-turkey.jpg?b=1&s=612x612&w=0&k=20&c=oS5sCZPBBSIxZ5-X9oxVaYzLsNnEBYGLaPaEMLPjhps=&w=800',
    navigateUrl: '/products?category=chicken',
  },
  {
    name: 'mutton',
    icon: '🐑',
    isAvailable: true,
    imageUrl:
      'https://media.istockphoto.com/id/465150864/photo/five-roaster-lamb-ribs-with-herbs.jpg?b=1&s=612x612&w=0&k=20&c=Rr_BHtm9t0VFuU7--kci0C1undNcoqtkIMyMmDBQMbM=&w=800',
    navigateUrl: '/products?category=mutton',
  },
  {
    name: 'fish',
    icon: '🐟',
    isAvailable: true,
    imageUrl:
      'https://images.pexels.com/photos/18698241/pexels-photo-18698241/free-photo-of-food-photography.jpeg?auto=compress&cs=tinysrgb&w=800',
    navigateUrl: '/products?category=fish',
  },
  {
    name: 'eggs',
    icon: '🥚',
    isAvailable: true,
    imageUrl:
      'https://images.pexels.com/photos/3568167/pexels-photo-3568167.jpeg?auto=compress&cs=tinysrgb&w=800',
    navigateUrl: '/products?category=eggs',
  },
];

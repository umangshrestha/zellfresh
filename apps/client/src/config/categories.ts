import { CategoriesSectionProps } from '../components/Categories/CategoriesSection/CategoriesSection.types.ts';

export const SUPPORTED_CATEGORIES: CategoriesSectionProps['categories'] = [
  {
    name: 'chicken',
    icon: '🐔',
    imageUrl:
      'https://media.istockphoto.com/id/858959854/photo/christmas-or-thanksgiving-turkey.jpg?b=1&s=612x612&w=0&k=20&c=oS5sCZPBBSIxZ5-X9oxVaYzLsNnEBYGLaPaEMLPjhps=&w=800',
    navigateUrl: '/products?category=chicken',
  },
  {
    imageUrl:
      'https://media.istockphoto.com/id/540233806/photo/grilled-beef-steaks.jpg?b=1&s=612x612&w=0&k=20&c=15VmUXcSgyuml4SBCA-0HoSENGwu11RI0WRI-6r43I4=',
    name: 'beef',
    icon: '🐄',
    navigateUrl: '/products?category=beef',
  },
  {
    name: 'pork',
    icon: '🐖',
    navigateUrl: '/products?category=pork',
    imageUrl:
      'https://images.pexels.com/photos/410648/pexels-photo-410648.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    name: 'mutton',
    icon: '🐑',
    imageUrl:
      'https://media.istockphoto.com/id/465150864/photo/five-roaster-lamb-ribs-with-herbs.jpg?b=1&s=612x612&w=0&k=20&c=Rr_BHtm9t0VFuU7--kci0C1undNcoqtkIMyMmDBQMbM=&w=800',
    navigateUrl: '/products?category=mutton',
  },
  {
    name: 'fish',
    icon: '🐟',
    imageUrl:
      'https://images.pexels.com/photos/18698241/pexels-photo-18698241/free-photo-of-food-photography.jpeg?auto=compress&cs=tinysrgb&w=800',
    navigateUrl: '/products?category=fish',
  },
  {
    name: 'eggs',
    icon: '🥚',
    imageUrl:
      'https://images.pexels.com/photos/3568167/pexels-photo-3568167.jpeg?auto=compress&cs=tinysrgb&w=800',
    navigateUrl: '/products?category=eggs',
  },
];

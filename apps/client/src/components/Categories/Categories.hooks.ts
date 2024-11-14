import { useQuery } from '@apollo/client';
import { SUPPORTED_CATEGORIES } from '../../config/categories.ts';
import { useNotification } from '../Notification';
import { CATEGORIES_QUERIES } from './Categories.queries.tsx';
import { CategoriesSectionProps } from './CategoriesSection/CategoriesSection.types.ts';

export const useCategories = () => {
  const { setNotification } = useNotification();
  const { data } = useQuery(CATEGORIES_QUERIES, {
    onError: (error) => {
      setNotification({
        message: error.message,
        severity: 'error',
      });
    },
  });

  return {
    data: (data?.categories ||
      SUPPORTED_CATEGORIES) as CategoriesSectionProps['categories'],
  };
};

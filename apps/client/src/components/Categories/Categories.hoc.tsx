import { useQuery } from '@apollo/client';
import { ComponentType } from 'react';
import { CATEGORIES_MOCK_DATA } from './Categories.mock';
import { LIST_CATEGORIES_QUERY } from './Categories.queries';
import { WithCategoriesProps } from './Categories.types';

export const withCategoriesQuery = <P extends WithCategoriesProps>(
  WrappedComponent: ComponentType<P>,
) => {
  return (props: Omit<P, keyof WithCategoriesProps>) => {
    const { data, previousData } = useQuery(LIST_CATEGORIES_QUERY, {
      fetchPolicy: 'cache-first',
    });
    return (
      <WrappedComponent
        {...(props as P)}
        categories={
          data?.categories || previousData?.categories || CATEGORIES_MOCK_DATA
        }
      />
    );
  };
};

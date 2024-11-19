import { useQuery } from '@apollo/client';
import { ComponentType } from 'react';
import { useNotification } from '../Notification';
import { CATEGORIES_MOCK_DATA } from './Categories.mock';
import { LIST_CATEGORIES_QUERY } from './Categories.queries';
import { WithCategoriesProps } from './Categories.types';

export function withCategoriesQuery<P extends WithCategoriesProps>(
  WrappedComponent: ComponentType<P>,
) {
  return (props: Omit<P, keyof WithCategoriesProps>) => {
    const { setNotification } = useNotification();
    const { data } = useQuery(LIST_CATEGORIES_QUERY, {
      onError: (error) => {
        setNotification({
          message: error.message,
          severity: 'error',
        });
      },
    });

    return (
      <WrappedComponent
        {...(props as P)}
        categories={data?.categories || CATEGORIES_MOCK_DATA}
      />
    );
  };
}

import { ComponentType } from 'react';
import { useNavigate } from 'react-router-dom';
import { CATEGORIES_MOCK_DATA } from './Categories.mock';
import { WithCategoriesProps } from './Categories.types';

export const withCategoriesQuery = <P extends WithCategoriesProps>(
  WrappedComponent: ComponentType<P>,
) => {
  return (props: Omit<P, keyof WithCategoriesProps>) => {
    const navigate = useNavigate();
    return (
      <WrappedComponent
        {...(props as P)}
        categories={CATEGORIES_MOCK_DATA}
        navigateTo={navigate}
      />
    );
  };
};

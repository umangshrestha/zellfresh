import { useQuery } from '@apollo/client';
import type { ProductFilterType } from '@repo/form-validator';
import { useState } from 'react';
import { ListProductsQuery } from '../__generated__/graphql';
import { LIST_PRODUCTS_QUERY } from '../query';

export type ProductItemType = ListProductsQuery['products']['items'][0];

export const useProduct = (variables: ProductFilterType = {}) => {
  const [products, setProducts] = useState<ProductItemType[]>([]);
  const { data, loading, previousData, fetchMore, error } = useQuery(
    LIST_PRODUCTS_QUERY,
    {
      variables: variables as object,
    },
  );

  const loadMore = () => {
    if (data && data.products.pagination.next) {
      fetchMore({
        variables: {
          cursor: data.products.pagination.next,
        },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          const newProducts = fetchMoreResult.products.items;
          setProducts([...products, ...newProducts]);

          return {
            products: {
              __typename: previousResult.products.__typename,
              items: [...previousResult.products.items, ...newProducts],
              pagination: fetchMoreResult.products.pagination,
            },
          };
        },
      }).catch((e) => {
        console.error(e);
      });
    }
  };

  return {
    data: loading ? previousData : data,
    loading: loading && !previousData,
    loadMore,
    error,
    category: variables?.category,
    getProduct: (productId: string) => {
      return products.find((product) => product.productId === productId);
    },
  };
};

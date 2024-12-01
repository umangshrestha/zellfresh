import { useQuery } from '@apollo/client';
import { useState } from 'react';
import { LIST_PRODUCTS_QUERY } from './Product.queries.ts';
import { useProductFilter } from './ProductFilter';
import { ProductItemType } from './ProductItem';

export const useProduct = () => {
  const [products, setProducts] = useState<ProductItemType[]>([]);
  const { productFilter } = useProductFilter();
  const { data, loading, previousData, fetchMore } = useQuery(
    LIST_PRODUCTS_QUERY,
    {
      variables: (productFilter || {}) as object,
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
    category: productFilter?.category,
    getProduct: (productId: string) => {
      return products.find((product) => product.productId === productId);
    },
  };
};

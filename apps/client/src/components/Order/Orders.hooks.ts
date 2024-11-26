import { useMutation, useQuery } from '@apollo/client';
import { useState } from 'react';
import { ListOrdersQuery } from '../../__generated__/graphql.ts';
import { CANCEL_ORDER_MUTATION, LIST_ORDERS_QUERY } from './Order.queries.ts';

export const useOrders = () => {
  const [orders, setOrders] = useState<ListOrdersQuery['orders']['items'][0][]>(
    [],
  );
  const { data, loading, error, previousData, fetchMore } =
    useQuery(LIST_ORDERS_QUERY);

  const [cancelOrderMutation] = useMutation(CANCEL_ORDER_MUTATION, {
    refetchQueries: [{ query: LIST_ORDERS_QUERY }],
  });

  const loadMore = () => {
    if (data && data.orders.pagination.next) {
      fetchMore({
        variables: {
          cursor: data.orders.pagination.next,
        },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          const newProducts = fetchMoreResult.orders.items;
          setOrders([...orders, ...newProducts]);

          return {
            orders: {
              __typename: previousResult.orders.__typename,
              items: [...previousResult.orders.items, ...newProducts],
              pagination: fetchMoreResult.orders.pagination,
            },
          };
        },
      }).catch((e) => {
        console.error(e);
      });
    }
  };

  const onCancelOrder = async (orderId: string) => {
    try {
      await cancelOrderMutation({
        variables: {
          orderId,
        },
      });
    } catch (e) {
      console.error(e);
    }
  };

  return {
    data: loading ? previousData : data,
    loading: loading && !previousData,
    error,
    loadMore,
    onCancelOrder,
  };
};

import { useMutation, useQuery } from '@apollo/client';

import { useState } from 'react';
import { DeliveryStatus } from '../__generated__/types';
import { ListOrdersQuery } from '../__generated__/graphql';
import {
  CANCEL_ORDER_MUTATION,
  CHANGE_ORDER_STATUS_MUTATION,
  LIST_ORDERS_QUERY,
  LIST_PRODUCTS_QUERY,
  SUBMIT_ORDER_FEEDBACK_MUTATION,
} from '../query';

export type OrderItemType = ListOrdersQuery['orders']['items'][0]['items'][0];
export type OrdersType = ListOrdersQuery['orders']['items'][0];

export const useOrders = () => {
  const [orders, setOrders] = useState<OrdersType[]>([]);
  const { data, loading, error, previousData, fetchMore } =
    useQuery(LIST_ORDERS_QUERY);

  const [cancelOrderMutation] = useMutation(CANCEL_ORDER_MUTATION, {
    refetchQueries: [
      { query: LIST_ORDERS_QUERY },
      { query: LIST_PRODUCTS_QUERY },
    ],
  });

  const [submitOrderFeedback] = useMutation(SUBMIT_ORDER_FEEDBACK_MUTATION, {
    refetchQueries: [{ query: LIST_ORDERS_QUERY }],
  });

  const [changeOrderStatusMutation] = useMutation(
    CHANGE_ORDER_STATUS_MUTATION,
    {
      refetchQueries: [{ query: LIST_ORDERS_QUERY }],
    },
  );

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

  const onCancelOrder = (orderId: string) => {
    cancelOrderMutation({
      variables: {
        orderId,
      },
    }).then();
  };

  const onSubmitFeedback = (
    orderId: string,
    rating: number,
    comment: string,
  ) => {
    submitOrderFeedback({
      variables: {
        orderId,
        rating,
        comment,
      },
    }).then();
  };

  const onChangeOrderStatus = (
    userId: string,
    orderId: string,
    status: DeliveryStatus,
  ) => {
    changeOrderStatusMutation({
      variables: {
        userId,
        orderId,
        status,
      },
    }).then();
  };

  return {
    data: loading ? previousData : data,
    loading: loading && !previousData,
    error,
    loadMore,
    onCancelOrder,
    onSubmitFeedback,
    onChangeOrderStatus,
  };
};

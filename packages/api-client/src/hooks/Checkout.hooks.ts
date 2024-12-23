import { useMutation, useQuery } from '@apollo/client';
import { CheckoutMutation, PaymentMethod } from '../__generated__/graphql';
import {
  CARTS_QUERY,
  CHECKOUT_MUTATION,
  CHECKOUT_QUERY,
  LIST_PRODUCTS_QUERY,
} from '../query';

export const useCheckout = (onCompleted: (data: CheckoutMutation) => void) => {
  const { data, loading, error } = useQuery(CHECKOUT_QUERY);
  const [checkoutMutation, { loading: mutationLoading }] = useMutation(
    CHECKOUT_MUTATION,
    {
      refetchQueries: [{ query: CARTS_QUERY }, { query: LIST_PRODUCTS_QUERY }],
      onCompleted,
    },
  );
  return {
    data,
    loading,
    mutationLoading,
    error,
    onPlaceOrder: (paymentMethod: PaymentMethod) =>
      checkoutMutation({
        variables: {
          paymentMethod,
        },
      }),
  };
};

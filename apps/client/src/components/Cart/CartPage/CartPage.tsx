import { useQuery } from '@apollo/client';
import CartList from '../CartList';
import { CARTS } from './CartPage.queries';

export const CartPage = () => {
  const { data, loading, error } = useQuery(CARTS);

  const onChange = (id: string, quantity: number) => {};

  const onRemove = (id: string) => {};
  return (
    <CartList
      data={data?.products?.items}
      loading={loading}
      error={error}
      onRemove={onRemove}
      onChange={onChange}
    />
  );
};

import { ListOrdersQuery } from '../../../__generated__/graphql.ts';

export type OrderListProps = {
  data: ListOrdersQuery['orders']['items'][0];
  loading: boolean;
};

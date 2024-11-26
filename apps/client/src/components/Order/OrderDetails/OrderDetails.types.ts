import { ListOrdersQuery } from '../../../__generated__/graphql.ts';

export type OrderDetailsProps = {
  data: ListOrdersQuery['orders']['items'][0];
  onCancelOrder: (orderId: string) => void;
  onSubmitFeedback: (orderId: string, rating: number) => void;
};

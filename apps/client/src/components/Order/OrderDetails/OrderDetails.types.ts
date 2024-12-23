import { OrdersType } from '@repo/api-client';

export type OrderDetailsProps = {
  data: OrdersType;
  onCancelOrder: (orderId: string) => void;
  onSubmitFeedback: (orderId: string, rating: number) => void;
};

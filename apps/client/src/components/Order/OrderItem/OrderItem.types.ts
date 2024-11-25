import { ListOrdersQuery } from '../../../__generated__/graphql.ts';

export type OrderItemProps = {
  badgeText?: string;
} &ListOrdersQuery['orders']['items'][0]['items'][0];

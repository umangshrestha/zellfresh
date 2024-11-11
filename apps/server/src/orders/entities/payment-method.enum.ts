import { registerEnumType } from '@nestjs/graphql';

export enum PaymentMethod {
  CASH = 'cash',
  CARD = 'card',
  UPI = 'upi',
}

registerEnumType(PaymentMethod, {
  name: 'PaymentMethod',
  description: 'The status of the order',
});

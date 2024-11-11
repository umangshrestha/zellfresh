import { Field, Float, Int, ObjectType } from '@nestjs/graphql';
import { Address } from '../../addresses/entities/address.entity';
import { CartItem } from '../../carts/entities/cart-item.entity';
import { DeliveryStatus } from './delivery-status.enum';
import { PaymentMethod } from './payment-method.enum';

@ObjectType()
class DeliveryContactDetails {
  @Field(() => String)
  name: string;

  @Field(() => String)
  phone: string;

  @Field(() => String)
  email: string;
}

@ObjectType()
class PaymentDetails {
  @Field(() => PaymentMethod)
  paymentMethod: PaymentMethod;

  @Field(() => Float)
  deliveryPrice: number;

  @Field(() => Int)
  subTotal: number;

  @Field(() => Float)
  tax: number;

  @Field(() => Float, {
    description: 'Total price of the order including delivery charge',
  })
  totalPrice: number;
}

@ObjectType()
export class Order {
  @Field(() => String)
  userId: string;

  @Field(() => String)
  orderId: string;

  @Field(() => [CartItem])
  items: CartItem[];

  @Field(() => DeliveryStatus)
  deliveryStatus: DeliveryStatus;

  @Field(() => Address)
  shippingAddress: Address;

  @Field(() => DeliveryContactDetails)
  contactDetails: DeliveryContactDetails;

  @Field(() => PaymentDetails)
  paymentDetails: PaymentDetails;

  @Field(() => String)
  createdAt: string;

  @Field(() => String)
  updatedAt: string;
}

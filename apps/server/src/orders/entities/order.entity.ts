import { Field, Float, Int, ObjectType } from '@nestjs/graphql';
import { Address } from '../../addresses/entities/address.entity';
import { CartItem } from '../../carts/entities/cart-item.entity';
import { DeliveryStatus } from './delivery-status.enum';
import { PaymentMethod } from './payment-method.enum';
import { CheckoutDetails } from './checkout-details.entity';

@ObjectType()
export class DeliveryContactDetails {
  @Field(() => String)
  name: string;

  @Field(() => String)
  phone: string;

  @Field(() => String)
  email: string;
}


@ObjectType()
export class OrderItem extends CartItem {
   @Field(() => Float, {description: 'Price at the time of order creation'})
   price: number;
}


@ObjectType()
export class Order {
  @Field(() => String)
  userId: string;

  @Field(() => String)
  orderId: string;

  @Field(() => [OrderItem])
  items: OrderItem[];

  @Field(() => Int)
  count: number;

  @Field(() => DeliveryStatus)
  deliveryStatus: DeliveryStatus;

  @Field(() => Address)
  shippingAddress: Address;

  @Field(() => PaymentMethod)
  paymentMethod: PaymentMethod;

  @Field(() => DeliveryContactDetails)
  contactDetails: DeliveryContactDetails;


  @Field(() => CheckoutDetails)
  checkoutDetails: CheckoutDetails;

  @Field(() => String)
  createdAt: string;

  @Field(() => String)
  updatedAt: string;
}

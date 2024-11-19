import { Field, Float, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CheckoutDetails {
  @Field(() => Float)
  deliveryPrice: number;

  @Field(() => Float)
  subTotal: number;

  @Field(() => Float)
  tax: number;

  @Field(() => Float)
  discount: number;

  @Field(() => Float)
  taxPercentage: number;

  @Field(() => Float, {
    description: 'Total price of the order including delivery charge',
  })
  totalPrice: number;

  @Field(() => Boolean)
  enableCheckout: boolean;
}

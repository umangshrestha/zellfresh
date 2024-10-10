import { Field, InputType, Int } from '@nestjs/graphql';
import { Min } from 'class-validator';

@InputType()
export class CartInput {
  @Field(() => String)
  productId: string;

  @Min(1)
  @Field(() => Int)
  quantity: number;
}

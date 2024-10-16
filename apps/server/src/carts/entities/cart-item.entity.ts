import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Product } from 'src/products/entities/product.entity';

@ObjectType()
export class CartItem {
  @Field(() => String)
  productId: string;

  @Field(() => Product, { nullable: true })
  product: Product | null;

  @Field(() => Int)
  quantity: number;

  @Field(() => String)
  createdAt: string;

  @Field(() => String)
  updatedAt: string;
}

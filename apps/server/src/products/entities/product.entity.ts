import { Field, Float, Int, ObjectType } from '@nestjs/graphql';

export interface ProductKey {
  productId: string;
  category: string;
}

@ObjectType()
export class Product implements ProductKey {
  @Field(() => String)
  productId: string;

  @Field()
  name: string;

  @Field()
  imageUrl: string;

  @Field({ nullable: true, defaultValue: '' })
  description: string;

  @Field(() => Float)
  price: number;

  @Field(() => Int)
  availableQuantity: number;

  @Field(() => Int)
  limitPerTransaction: number;

  @Field()
  unit: string;

  @Field()
  category: string;

  @Field(() => Float)
  rating: number;

  @Field()
  badgeText: string;

  @Field(() => [String])
  tags: Array<string>;

  @Field()
  createdAt: string;

  @Field()
  updatedAt: string;
}

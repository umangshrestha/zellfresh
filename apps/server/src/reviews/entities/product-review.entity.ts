import { Field, Float, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ProductReview {
  @Field(() => String)
  userId: string;

  @Field(() => String)
  productId: string;

  @Field(() => Float)
  rating: number;

  @Field()
  comment: string;

  @Field()
  createdAt: string;

  @Field()
  updatedAt: string;
}

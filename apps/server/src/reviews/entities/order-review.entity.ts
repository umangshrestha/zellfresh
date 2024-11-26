import { Field, Float, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class OrderReview {
  @Field(() => Float)
  rating: number;

  @Field()
  comment: string;

  @Field()
  createdAt: string;

  @Field()
  updatedAt: string;
}

import { Field, Float, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Rating {
  @Field(() => Float)
  rating: number;

  @Field(() => Int)
  count: number;
}

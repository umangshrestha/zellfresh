import { Field, Float, Int, ObjectType } from '@nestjs/graphql';
import { Rating } from '../../reviews/entities/rating.entity';
import { Review } from '../../reviews/entities/review.entity';

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

  @Field(() => Rating, { nullable: true })
  rating?: Rating;

  @Field()
  badgeText: string;

  @Field(() => [String])
  tags: Array<string>;

  @Field()
  createdAt: string;

  @Field()
  updatedAt: string;

  @Field(() => [Review])
  reviews: Review[];
}

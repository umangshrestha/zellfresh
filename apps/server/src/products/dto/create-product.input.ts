import { Field, Float, InputType, Int } from '@nestjs/graphql';
import { IsUrl, IsUUID, Max, Min } from 'class-validator';

@InputType()
export class CreateProductInput {
  @IsUUID()
  @Field(() => String, { nullable: true })
  productId: string;

  @Field()
  name: string;

  @Field()
  @IsUrl()
  imageUrl: string;

  @Field({ nullable: true })
  description: string | null;

  @Min(0)
  @Field(() => Float)
  price: number;

  @Field(() => Int)
  @Min(0)
  availableQuantity: number;

  @Field(() => Int)
  @Min(1)
  limitPerTransaction: number;

  @Field()
  category: string;

  @Max(5)
  @Min(0)
  @Field(() => Float, { defaultValue: 5 })
  rating: number;

  @Field()
  badgeText: string;

  @Field(() => [String])
  tags: Array<string>;
}

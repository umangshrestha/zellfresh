import { Field, Float, InputType, Int } from '@nestjs/graphql';
import { IsEnum, IsInt, IsString, IsUrl, Min } from 'class-validator';
import { SUPPORTED_PRODUCTS } from 'src/common/supported-products';

@InputType()
export class PutProductInput {
  @Field(() => String)
  productId: string;

  @IsString()
  @Field()
  name: string;

  @Field()
  @IsUrl()
  imageUrl: string;

  @Field()
  @IsString()
  unit: string;

  @IsString()
  @Field({ nullable: true })
  description: string | null;

  @IsInt()
  @Min(0)
  @Field(() => Float)
  price: number;

  @IsInt()
  @Field(() => Int)
  @Min(0)
  availableQuantity: number;

  @IsInt()
  @Field(() => Int)
  @Min(1)
  limitPerTransaction: number;

  @IsString()
  @Field()
  @IsEnum(SUPPORTED_PRODUCTS)
  category: string;

  @IsString()
  @Field()
  badgeText: string;

  @IsString({ each: true })
  @Field(() => [String])
  tags: Array<string>;
}

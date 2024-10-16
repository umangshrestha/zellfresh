import { Field, Float, InputType, Int } from '@nestjs/graphql';
import {
  IsInt,
  IsOptional,
  IsString,
  IsUrl,
  IsUUID,
  Max,
  Min,
} from 'class-validator';
import { get_date_time_string } from 'src/common/get-date-time';

@InputType()
export class CreateProductInput {
  @IsUUID()
  @IsOptional()
  @Field(() => String, { nullable: true })
  productId?: string;

  @IsString()
  @Field()
  name: string;

  @Field()
  @IsUrl()
  imageUrl: string;

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
  category: string;

  @IsInt()
  @Max(5)
  @Min(0)
  @Field(() => Float, { defaultValue: 5 })
  rating: number;

  @IsString()
  @Field()
  badgeText: string;

  @IsString({ each: true })
  @Field(() => [String])
  tags: Array<string>;

  @IsString()
  createdAt: string = get_date_time_string();
  @IsString()
  updatedAt: string = get_date_time_string();
}

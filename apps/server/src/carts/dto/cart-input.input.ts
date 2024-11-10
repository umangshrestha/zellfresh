import { Field, InputType, Int } from '@nestjs/graphql';
import { IsInt, IsOptional, IsString, Min } from 'class-validator';
import { get_date_time_string } from 'src/common/get-date-time';

@InputType()
export class CartInput {
  @Field(() => Int, { defaultValue: 5 })
  @IsOptional()
  limit: number = 5;

  @Min(0)
  @IsInt()
  @Field(() => Int)
  quantity: number;

  @IsString()
  @Field(() => String)
  productId: string;

  @IsString()
  createdAt: string = get_date_time_string();

  @IsString()
  updatedAt: string = get_date_time_string();
}

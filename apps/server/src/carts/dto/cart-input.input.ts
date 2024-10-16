import { Field, InputType, Int } from '@nestjs/graphql';
import { IsInt, IsString, IsUUID, Min } from 'class-validator';
import { get_date_time_string } from 'src/common/get-date-time';

@InputType()
export class CartInput {
  @IsUUID()
  @Field(() => String)
  productId: string;

  @Min(0)
  @IsInt()
  @Field(() => Int)
  quantity: number;

  @IsString()
  createdAt: string = get_date_time_string();

  @IsString()
  updatedAt: string = get_date_time_string();
}

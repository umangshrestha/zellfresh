import { Field, InputType, Int } from '@nestjs/graphql';
import { IsInt, IsString, Min } from 'class-validator';
import { get_date_time_string } from 'src/common/get-date-time';
import {Status} from 'src/orders/entities/status';

@InputType()
export class CreateOrderInput {
  @Min(0)
  @IsInt()
  @Field(() => Int)
  quantity: number;

  @IsString()
  @Field(() => String)
  orderId: string;

  @IsString()
  @Field(() => String)
  productId: string;

  @IsString()
  createdAt: string = get_date_time_string();

  @Field(() => Status)  
  status: Status;
}

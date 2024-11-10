import { Field, Int, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Product, ProductKey } from 'src/products/entities/product.entity';
import {Status} from './status.js';

registerEnumType(Status, {
  name: 'Status',
  description: 'The status of the order',
});

@ObjectType()
export class Order {

  @Field(()=>String)
  orderId:string;

  @Field(()=>String)
  productId:string;

  @Field()
  category:string;

  @Field(()=> Product, {nullable:true})
  product:Product|null;

  @Field(()=> Int)
  quantity:number;

  @Field(()=> String)
  createdAt:string;

  @Field(()=> String)
  status:Status

}

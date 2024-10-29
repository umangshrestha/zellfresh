import { Field, ObjectType } from '@nestjs/graphql';
import { Address } from './address.entity';

@ObjectType()
export class User {
  @Field(() => String)
  userId: string;

  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => String, { nullable: true })
  email?: string;

  @Field(() => String)
  role: string;

  @Field(() => String, { nullable: true })
  imageUrl?: string;

  @Field(() => String, { nullable: true })
  phone?: string;

  @Field(() => Address, { nullable: true })
  address?: Address;

  @Field()
  blocked: boolean;

  @Field(() => String)
  createdAt: string;

  @Field(() => String)
  updatedAt: string;
}

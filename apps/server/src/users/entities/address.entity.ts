import { Field, Int, ObjectType } from '@nestjs/graphql';
import { IsOptional, IsString } from 'class-validator';

@ObjectType()
export class Address {
  @Field(() => Int, { nullable: true })
  apartmentNumber?: number;

  @Field(() => String)
  street: string;

  @Field(() => String)
  city: string;

  @IsString()
  @Field(() => String)
  state: string;

  @IsString()
  @Field(() => String)
  zip: string;

  @IsString()
  @Field(() => String)
  country: string;

  @IsOptional()
  @Field(() => String, { nullable: true })
  additionalInfo?: string;
}

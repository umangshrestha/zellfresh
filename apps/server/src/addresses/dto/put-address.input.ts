import { Field, InputType } from '@nestjs/graphql';
import { IsOptional, IsString, IsUUID } from 'class-validator';
import { get_date_time_string } from '../../common/get-date-time';

@InputType()
export class PutAddressInput {
  @IsOptional()
  @IsUUID()
  @Field(() => String, { nullable: true })
  addressId?: string;

  @IsOptional()
  userId?: string;

  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
  apt?: string;

  @IsString()
  @Field(() => String)
  street: string;

  @IsString()
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

  @IsString()
  createdAt: string = get_date_time_string();
  @IsString()
  updatedAt: string = get_date_time_string();
}

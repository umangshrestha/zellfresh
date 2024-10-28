import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsPhoneNumber, IsString } from 'class-validator';
import { get_date_time_string } from '../../common/get-date-time';

@InputType()
export class PutUserInput {
  @Field()
  userId: string;

  @Field()
  name?: string;

  @Field({ nullable: true })
  imageUrl?: string;

  @IsEmail()
  @Field()
  email: string;

  @IsPhoneNumber('IN')
  @Field()
  phone: string;

  @Field()
  blocked: boolean;

  @IsString()
  createdAt: string = get_date_time_string();
  @IsString()
  updatedAt: string = get_date_time_string();
}

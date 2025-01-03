import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsPhoneNumber } from 'class-validator';

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
}

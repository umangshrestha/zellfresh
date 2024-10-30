import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsPhoneNumber, IsString } from 'class-validator';

@InputType()
export class UpdateUserInput {
  @IsString()
  @Field()
  name: string;

  @Field({ nullable: true })
  imageUrl?: string;

  @IsEmail()
  @Field()
  email: string;

  @IsPhoneNumber('IN')
  @Field()
  phone: string;
}

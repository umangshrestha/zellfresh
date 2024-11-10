import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Category {
  @Field(() => String)
  name: string;

  @Field(() => String)
  icon: string;

  @Field(() => String)
  imageUrl: string;

  @Field(() => String)
  navigateUrl: string;
}

import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class PutCategoryInput {
  @Field(() => String)
  name: string;

  @Field(() => String)
  icon: string;

  @Field(() => String)
  imageUrl: string;

  @Field(() => String)
  navigateUrl: string;
}

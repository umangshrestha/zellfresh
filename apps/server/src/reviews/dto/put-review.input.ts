import { Field, Float, InputType } from '@nestjs/graphql';
import { IsString, Max, Min } from 'class-validator';

@InputType()
export class PutReviewInput {
  @Min(1)
  @Max(5)
  @Field(() => Float)
  rating: number;

  @IsString()
  @Field(() => String)
  comment: string;
}

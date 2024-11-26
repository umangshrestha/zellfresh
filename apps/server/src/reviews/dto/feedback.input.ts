import { Field, Float, InputType } from '@nestjs/graphql';
import { IsString, Max, MaxLength, Min } from 'class-validator';

@InputType()
export class FeedbackInput {
  @Min(0)
  @Max(5)
  @Field(() => Float)
  rating: number;

  @IsString()
  @MaxLength(255)
  @Field(() => String)
  comment: string;
}

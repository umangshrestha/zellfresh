import { ArgsType, Field, Float, Int } from '@nestjs/graphql';
import { IsBoolean, IsOptional, IsPositive, Max, Min } from 'class-validator';

@ArgsType()
export class FilterReviewArgs {
  @Field(() => Int, { defaultValue: 5 })
  @IsOptional()
  limit: number = 5;

  @Field(() => String, { nullable: true })
  @IsOptional()
  cursor?: string;

  @Max(5)
  @Min(0)
  @IsOptional()
  @Field(() => Float, { nullable: true })
  minRating?: number;

  @Max(5)
  @IsPositive()
  @IsOptional()
  @Field(() => Float, { nullable: true })
  maxRating?: number;

  @IsBoolean()
  @Field(() => Boolean, { nullable: true, description: 'Sort by rating' })
  sortAsc?: boolean = true;
}

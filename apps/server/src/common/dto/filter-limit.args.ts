import { ArgsType, Field, Int } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';

@ArgsType()
export class FilterLimitArgs {
  @Field(() => Int, { defaultValue: 4 })
  @IsOptional()
  limit: number = 4;
}

import { ArgsType, Field, Int } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';

@ArgsType()
export class FilterOrderArgs {
  @Field(() => Int, { defaultValue: 10 })
  @IsOptional()
  limit: number = 10;

  @Field(() => String, { nullable: true })
  @IsOptional()
  cursor?: string;
}

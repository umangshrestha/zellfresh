import { ArgsType, Field, Int } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';

@ArgsType()
export class ReadProductInput {
  @Field(() => Int, { defaultValue: 5 })
  @IsOptional()
  limit: number = 5;
}

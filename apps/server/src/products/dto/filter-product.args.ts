import { ArgsType, Field, Float, Int } from '@nestjs/graphql';
import {
  IsBoolean,
  IsEnum,
  IsOptional,
  IsPositive,
  IsString,
  Max,
  Min,
  ValidateIf,
} from 'class-validator';
import { SUPPORTED_PRODUCTS } from 'src/common/supported-products';

const SORT_BY = ['name', 'price', 'rating'];

@ArgsType()
export class FilterProductsArgs {
  @Field(() => Int, { defaultValue: 10 })
  @IsOptional()
  limit: number = 10;

  @Field(() => String, { nullable: true })
  @IsOptional()
  cursor?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  name?: string;

  @Field(() => String, {
    nullable: true,
    description: `Supported categories: ${SUPPORTED_PRODUCTS.join(', ')}`,
  })
  @IsEnum(SUPPORTED_PRODUCTS)
  @IsOptional()
  category?: string;

  @Field(() => [String], { nullable: true })
  tags?: Array<string>;

  @IsOptional()
  @Field(() => Float, { nullable: true })
  @Min(0)
  @IsOptional()
  minPrice?: number;

  @IsPositive()
  @IsOptional()
  @Field(() => Float, { nullable: true })
  maxPrice?: number;

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

  @IsOptional()
  @Field({ nullable: true })
  showOutOfStock: boolean = false;

  @ValidateIf((o) => o.maxPrice !== undefined && o.minPrice !== undefined)
  validatePriceRange() {
    if (this.maxPrice <= this.minPrice) {
      throw new Error('maxPrice must be greater than minPrice');
    }
  }

  @ValidateIf((o) => o.maxRating !== undefined && o.minRating !== undefined)
  validateRatingRange() {
    if (this.maxRating <= this.minRating) {
      throw new Error('maxRating must be greater than minRating');
    }
  }

  @IsString()
  @IsEnum(SORT_BY)
  @Field(() => String, {
    nullable: true,
    description: `Supported values: ${SORT_BY.join(', ')}`,
  })
  sortBy: string = 'name';

  @IsBoolean()
  @Field(() => Boolean, { nullable: true })
  sortAsc?: boolean = true;
}

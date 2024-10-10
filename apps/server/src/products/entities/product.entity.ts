import { AttributeValue } from '@aws-sdk/client-dynamodb';
import { Field, Float, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Product {
  @Field(() => String)
  productId: string;

  @Field()
  name: string;

  @Field()
  imageUrl: string;

  @Field({ nullable: true, defaultValue: '' })
  description: string;

  @Field(() => Float)
  price: number;

  @Field(() => Int)
  availableQuantity: number;

  @Field(() => Int)
  limitPerTransaction: number;

  @Field()
  category: string;

  @Field(() => Float)
  rating: number;

  @Field()
  badgeText: string;

  @Field(() => [String])
  tags: Array<string>;

  static toDynamodbObject(product: Product): Record<string, AttributeValue> {
    return {
      productId: { S: product.productId },
      name: { S: product.name },
      description: { S: product.description },
      price: { N: product.price.toString() },
      imageUrl: { S: product.imageUrl },
      availableQuantity: { N: product.availableQuantity.toString() },
      limitPerTransaction: { N: product.limitPerTransaction.toString() },
      category: { S: product.category },
      rating: { N: product.rating.toString() },
      badgeText: { S: product.badgeText },
      tags: { SS: product.tags },
    };
  }

  static fromDynamodbObject(item: Record<string, AttributeValue>): Product {
    const product = new Product();
    product.productId = item.productId.S;
    product.name = item.name.S;
    product.description = item.description.S;
    product.price = parseFloat(item.price.N);
    product.imageUrl = item.imageUrl.S;
    product.availableQuantity = parseInt(item.availableQuantity.N);
    product.limitPerTransaction = parseInt(item.limitPerTransaction.N);
    product.category = item.category.S;
    product.rating = parseFloat(item.rating.N);
    product.badgeText = item.badgeText.S;
    product.tags = item.tags.SS;
    return product;
  }
}

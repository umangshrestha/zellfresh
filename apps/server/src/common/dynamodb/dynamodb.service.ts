import { DynamoDB } from '@aws-sdk/client-dynamodb';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DynamodbService {
  public readonly client: DynamoDB;
  constructor(readonly configService: ConfigService) {
    const isProduction = configService.getOrThrow('NODE_ENV') === 'production';
    const options = {
      region: configService.getOrThrow('AWS_REGION'),
      accessKeyId: configService.getOrThrow('AWS_ACCESS_KEY_ID'),
      secretAccessKey: configService.getOrThrow('AWS_SECRET_ACCESS_KEY'),
      endpoint: isProduction ? undefined : 'http://localhost:4566',
    };
    this.client = new DynamoDB(options);
  }
}

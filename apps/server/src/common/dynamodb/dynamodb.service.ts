import { DynamoDB } from '@aws-sdk/client-dynamodb';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DynamodbService {
  public readonly client: DynamoDB;
  private readonly logger = new Logger(DynamodbService.name);
  constructor(readonly configService: ConfigService) {
    const isProduction = configService.getOrThrow('NODE_ENV') === 'production';
    const options = {
      region: configService.getOrThrow('AWS_REGION'),
      accessKeyId: configService.getOrThrow('AWS_ACCESS_KEY_ID'),
      secretAccessKey: configService.getOrThrow('AWS_SECRET_ACCESS_KEY'),
      endpoint: isProduction ? undefined : configService.getOrThrow('DYNAMODB_ENDPOINT'),
    };
    this.logger.log(`DynamodbService initialized with options: ${JSON.stringify(options)}`);
    this.client = new DynamoDB(options);
  }
}

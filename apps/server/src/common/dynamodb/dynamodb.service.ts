import { DynamoDB } from '@aws-sdk/client-dynamodb';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DynamodbService {
  public readonly client: DynamoDB;
  private readonly logger = new Logger(DynamodbService.name);

  constructor(readonly configService: ConfigService) {
    if (
      configService.getOrThrow('NODE_ENV') === 'development' ||
      configService.getOrThrow('NODE_ENV') === 'test'
    ) {
      console.log("====== dynadb enters ===========");
      
      const options = {
        region: configService.getOrThrow('AWS_REGION'),
        accessKeyId: 'test',
        secretAccessKey: 'test',
        endpoint: configService.getOrThrow('DYNAMODB_ENDPOINT'),
      };
      this.client = new DynamoDB(options);
    } else {
      const options = {
        region: configService.getOrThrow('AWS_REGION'),
      };
      console.log('options', options);
      this.logger.log(
        `DynamodbService initialized with options: ${JSON.stringify(options)}`,
      );
      this.client = new DynamoDB(options);
    }
  }
}

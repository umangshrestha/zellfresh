import { Injectable } from '@nestjs/common';
import { HealthIndicator, HealthIndicatorResult } from '@nestjs/terminus';
import { DynamoDBClient, DescribeTableCommand } from '@aws-sdk/client-dynamodb';
import { DynamodbService } from '../dynamodb/dynamodb.service';

@Injectable()
export class DynamoDBHealthIndicator extends HealthIndicator {

  constructor(private readonly dynamodbServices: DynamodbService) {
    super();
  }

  async isHealthy(key: string, tableName: string): Promise<HealthIndicatorResult> {
    try {
      const command = new DescribeTableCommand({ TableName: tableName });
      await this.dynamodbServices.client.send(command);

      return this.getStatus(key, true);
    } catch (error) {
      return this.getStatus(key, false, { message: error.message });
    }
  }
}

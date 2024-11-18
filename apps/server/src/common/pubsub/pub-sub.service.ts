import { Injectable, Logger } from '@nestjs/common';
import { PubSub } from 'graphql-subscriptions';


@Injectable()
export class PubSubService {
  private readonly pubSub = new PubSub();

  updateCount(val: {sub: string, cartCount: number}) {
    return this.pubSub.publish('cartUpdated', val);
  }

  asyncCartIterator() {
    return this.pubSub.asyncIterableIterator('cartUpdated');
  }
}
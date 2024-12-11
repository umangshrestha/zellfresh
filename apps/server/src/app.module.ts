import { ApolloDriverConfig } from '@nestjs/apollo';
import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ThrottlerModule } from '@nestjs/throttler';
import { join } from 'path';
import { AuthModule } from 'src/auth/auth.module';
import { CartsModule } from 'src/carts/carts.module';
import { validate } from 'src/common/environment';
import { ProductsModule } from 'src/products/products.module';
import { AddressesModule } from './addresses/addresses.module';
import { CategoriesModule } from './categories/categories.module';
import { ContentfulModule } from './common/contentful/contentful.module';
import { GraphQlConfig } from './common/graphql.config';
import { HealthModule } from './common/health/health.module';
import { ValidationProvider } from './common/validator.provider';
import { OrdersModule } from './orders/orders.module';
import { ReviewsModule } from './reviews/reviews.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath:
        process.env.NODE_ENV === 'production'
          ? join(__dirname, '..', 'client')
          : join(__dirname, '..', '..', 'client', 'dist'),
    }),
    ConfigModule.forRoot({ validate }),
    CacheModule.register({
      isGlobal: true,
    }),
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 10,
      },
    ]),
    ProductsModule,
    CartsModule,
    AuthModule,
    UsersModule,
    GraphQLModule.forRootAsync<ApolloDriverConfig>(GraphQlConfig),
    AddressesModule,
    OrdersModule,
    CategoriesModule,
    ContentfulModule,
    ReviewsModule,
    HealthModule,
  ],
  controllers: [],
  providers: [ValidationProvider],
})
export class AppModule {}

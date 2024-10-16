import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { AuthModule } from 'src/auth/auth.module';
import { CartsModule } from 'src/carts/carts.module';
import { validate } from 'src/config/environment';
import { ProductsModule } from 'src/products/products.module';

@Module({
  imports: [
    ConfigModule.forRoot({ validate }),
    ProductsModule,
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      imports: [ConfigModule],
      inject: [ConfigService],
      driver: ApolloDriver,

      useFactory: (config: ConfigService) => ({
        debug: config.getOrThrow('NODE_ENV') !== 'production',
        playground: config.getOrThrow('NODE_ENV') !== 'production',
        autoSchemaFile: join(process.cwd(), 'schema/schema.graphql'),
        subscriptions: {
          'graphql-ws': true,
        },
      }),
    }),
    CartsModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  // configure(consumer: MiddlewareConsumer) {
  //   if (process.env.NODE_ENV !== 'production') {
  //     consumer.apply(LoggerMiddleware).forRoutes('*');
  //   }
  // }
}

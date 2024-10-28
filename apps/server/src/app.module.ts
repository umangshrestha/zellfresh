import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AuthModule } from 'src/auth/auth.module';
import { CartsModule } from 'src/carts/carts.module';
import { validate } from 'src/common/environment';
import { ProductsModule } from 'src/products/products.module';
import { ValidationProvider } from './common/validator.provider';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'client', 'dist'),
    }),
    ConfigModule.forRoot({ validate }),
    ProductsModule,
    CartsModule,
    AuthModule,
    UsersModule,
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      imports: [ConfigModule],
      inject: [ConfigService],
      driver: ApolloDriver,

      useFactory: (config: ConfigService) => ({
        debug: config.getOrThrow('NODE_ENV') !== 'production',
        playground: config.getOrThrow('NODE_ENV') !== 'production',
        autoSchemaFile: join(process.cwd(), 'schema/schema.graphql'),
      }),
    }),
  ],
  controllers: [],
  providers: [ValidationProvider],
})
export class AppModule {
  // configure(consumer: MiddlewareConsumer) {
  //   if (process.env.NODE_ENV !== 'production') {
  //     consumer.apply(LoggerMiddleware).forRoutes('*');
  //   }
  // }
}

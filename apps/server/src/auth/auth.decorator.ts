import {
  createParamDecorator,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

interface AuthUserDecoratorOptions {
  required?: boolean;
}

export const AuthUser = createParamDecorator(
  (
    options: AuthUserDecoratorOptions = { required: true },
    context: ExecutionContext,
  ) => {
    const ctx = GqlExecutionContext.create(context);
    const user = ctx.getContext()?.req?.user;
    if (!user) {
      if (options.required) {
        throw new HttpException(
          'User not authenticated',
          HttpStatus.UNAUTHORIZED,
        );
      }
      return null;
    }
    return user;
  },
);

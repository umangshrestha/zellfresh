import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const AuthUser = createParamDecorator(
  (_: unknown, context: ExecutionContext) => {
    try {
      const ctx = GqlExecutionContext.create(context);
      const request = ctx.switchToHttp().getRequest();
      console.log('request.user', request.user);
      return request.user;
    } catch (e) {
      console.error(e);
      return null;
    }
  },
);

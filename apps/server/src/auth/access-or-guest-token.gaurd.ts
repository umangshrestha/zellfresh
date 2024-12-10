import { ExecutionContext, Injectable, Logger } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

@Injectable()
export class AccessOrGuestTokenGuard extends AuthGuard(['jwt-guest', 'jwt']) {
  private readonly loggerService = new Logger(AccessOrGuestTokenGuard.name);

  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const result = super.canActivate(context);
    if (result instanceof Promise) {
      return result
        .then((allowed) => {
          return allowed;
        })
        .catch((error) => {
          this.loggerService.error(`Error: ${error}`);
          // how to do trace here?
          console.trace();
          return false;
        });
    }
    return result;
  }
}

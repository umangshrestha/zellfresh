import { Injectable, Logger } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware {
  private readonly loggerService = new Logger(LoggerMiddleware.name);

  use(req: Request, res: Response, next: NextFunction): void {
    this.loggerService.debug(`Request ==> ${req.ip} ${req.method} ${req.url}`);
    this.loggerService.debug(`Request Cookies ${JSON.stringify(req.cookies)}]`);
    this.loggerService.debug(`Request Headers ${JSON.stringify(req.headers)}]`);
    this.loggerService.debug(`[Request Body ${JSON.stringify(req.body)}]`);
    res.on('close', () => {
      this.loggerService.debug(`Response Status ${res.statusCode}`);
      this.loggerService.debug(
        `Response Cookies ${JSON.stringify(res.getHeaders())}`,
      );
    });

    next();
  }
}

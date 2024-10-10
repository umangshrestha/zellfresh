import { Injectable, Logger } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware {
  use(req: Request, res: Response, next: NextFunction): void {
    Logger.log(`Request ==> ${req.ip} ${req.method} ${req.url}`);
    Logger.log(`Request Cookies ${JSON.stringify(req.cookies)}]`);
    Logger.log(`Request Headers ${JSON.stringify(req.headers)}]`);
    Logger.log(`[Request Body ${JSON.stringify(req.body)}]`);
    res.on('close', () => {
      Logger.log(`Response Status ${res.statusCode}`);
      Logger.log(`Response Cookies ${JSON.stringify(res.getHeaders())}`);
    });

    next();
  }
}

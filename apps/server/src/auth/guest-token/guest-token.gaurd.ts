import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class GuestTokenGuard extends AuthGuard('jwt-guest') {}

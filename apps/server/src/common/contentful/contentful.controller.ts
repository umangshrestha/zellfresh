import { Controller, Put, UseGuards } from '@nestjs/common';
import { ContentfulService } from './contentful.service';
import { AccessTokenGuard } from '../../auth/access-token/access-token.gaurd';
import { AuthUser } from '../../auth/auth.decorator';
import { Auth } from '../../auth/entities/auth.entity';

@Controller('cache')
export class ContentfulController {
  constructor(private readonly contentfulService: ContentfulService) {}

  @UseGuards(AccessTokenGuard)
   @Put('sync')
    sync(
        @AuthUser() { role }: Auth
    ): Promise<Boolean> {
        if (role !== 'ADMIN') {
            throw new Error('You are not authorized to perform this action');
        }
        return this.contentfulService.sync();
    }
}
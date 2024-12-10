import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cron } from '@nestjs/schedule';
import axios from 'axios';
import { CategoriesService } from 'src/categories/categories.service';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { PutProductInput } from 'src/products/dto/put-product.input';
import { ProductsService } from 'src/products/products.service';
import { PutCategoryInput } from '../../categories/dto/put-category.input';

@Injectable()
export class ContentfulService {
  private nextSyncUrl: string;
  private readonly accessToken: string;
  private readonly loggerService = new Logger(ContentfulService.name);

  constructor(
    readonly configService: ConfigService,
    private readonly prismaService: PrismaService,
    private readonly productsService: ProductsService,
    private readonly categoriesService: CategoriesService,
  ) {
    const CONTENTFUL_SPACE_ID = configService.getOrThrow('CONTENTFUL_SPACE_ID');
    const CONTENTFUL_ENVIRONMENT = configService.getOrThrow(
      'CONTENTFUL_ENVIRONMENT',
    );
    this.accessToken = configService.getOrThrow(
      'CONTENTFUL_DELIVERY_ACCESS_TOKEN',
    );
    this.nextSyncUrl = `https://cdn.contentful.com/spaces/${CONTENTFUL_SPACE_ID}/environments/${CONTENTFUL_ENVIRONMENT}/sync?initial=true`;
    this.getSyncUrl()
      .then((data) => {
        if (data) {
          this.nextSyncUrl = data.nextSyncUrl;
        }
      })
      .catch((err) => {
        this.loggerService.error(err);
      })
      .finally(() => {
        this.cronSyncUp().catch();
      });
  }

  getSyncUrl() {
    return this.prismaService.syncToken.findFirst({
      select: {
        nextSyncUrl: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async setSyncUrl(url: string) {
    this.nextSyncUrl = url;
    try {
      await this.prismaService.syncToken.create({
        data: {
          nextSyncUrl: url,
        },
      });
    } catch (err) {
      this.loggerService.error(err);
    }
  }

  // Run every day at midnight
  @Cron('0 0 * * *')
  async cronSyncUp() {
    this.loggerService.log(
      `Starting sync: ================> ${this.nextSyncUrl}`,
    );
    const listOfUpdatedIds = [];
    try {
      const data = await axios.get(this.nextSyncUrl, {
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
        },
      });

      if (data.data.items.length === 0) {
        return true;
      }
      for (const entry of data.data.items) {
        switch (entry.sys.type) {
          case 'Entry':
            listOfUpdatedIds.push(entry.sys.id);
            if (entry.sys.contentType.sys.id === 'products') {
              const product = new PutProductInput();
              product.productId = entry.sys.id;
              product.name = entry.fields.name['en-US'];
              product.description = entry.fields.description['en-US'];
              product.price = entry.fields.price['en-US'];
              product.availableQuantity =
                entry.fields.availableQuantity['en-US'];
              product.category = entry.fields.category['en-US'];
              product.tags = entry.fields.tags['en-US'];
              product.imageUrl = entry.fields.imageUrl['en-US'];
              product.limitPerTransaction =
                entry.fields.limitPerTransaction['en-US'];
              product.unit = entry.fields.unit['en-US'];
              product.badgeText = entry.fields.badgeText['en-US'];
              this.loggerService.log(`Product: ${JSON.stringify(product)}`);
              await this.productsService.put(product);
            } else if (entry.sys.contentType.sys.id === 'categories') {
              const category = new PutCategoryInput();
              category.name = entry.fields.name['en-US'];
              category.icon = entry.fields.icon['en-US'];
              category.imageUrl = entry.fields.imageUrl['en-US'];
              category.navigateUrl = entry.fields.navigateUrl['en-US'];
              this.loggerService.log(`Category: ${JSON.stringify(category)}`);
              await this.categoriesService.put(category);
            } else {
              this.loggerService.warn(
                `Unknown content type: ${entry.sys.contentType.sys.id}`,
              );
            }
            break;
          case 'DeletedEntry':
            this.loggerService.log(`Deleted category: ${entry.sys.id}`);
            this.loggerService.debug(entry);
            const success = await this.categoriesService.remove(entry.sys.id);
            if (!success) {
              this.loggerService.error(
                `Failed to remove product: ${entry.sys.id}`,
              );
              await this.productsService.remove(entry.sys.id);
            }
            break;
          default:
            this.loggerService.warn(`Unknown entry type: ${entry.sys.type}`);
            this.loggerService.debug(entry);
        }
      }
      await this.setSyncUrl(data.data.nextSyncUrl);
    } catch (err) {
      this.loggerService.error(err);
      return false;
    }
    await this.productsService.syncProducts(listOfUpdatedIds);
  }
}

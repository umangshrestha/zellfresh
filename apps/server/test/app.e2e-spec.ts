import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import * as request from 'supertest';

const MOCK_PRODUCT = require('./mock-products.json');

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let server: any;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    server = app.getHttpServer();

    await app.init();
  });

  afterEach(async () => {
    await app.close();
    server.close();
  });

  it.each(MOCK_PRODUCT)('POST /graphql createProduct', (product) => {
    const createProductMutation = `
    mutation($createProductInput: CreateProductInput!) {
      createProduct(createProductInput: $createProductInput) {
        productId
        name
        imageUrl
        description
        price
        availableQuantity
        limitPerTransaction
        category
        rating
        badgeText
        tags
      }
    }
    `;
    request(server)
      .post('/graphql')
      .send({
        query: createProductMutation,
        variables: {
          createProductInput: product,
        },
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.data.createProduct).toEqual(product);
      });
  });

  it.each(MOCK_PRODUCT)('POST /graphql createProduct', (product) => {
    const createProductMutation = `
    query($productId: productId!) {
      product(productId: $productId) {
        productId
        name
        imageUrl
        description
        price
        availableQuantity
        limitPerTransaction
        category
        rating
        badgeText
        tags
      }
    }
    `;
    request(server)
      .post('/graphql')
      .send({
        query: createProductMutation,
        variables: {
          createProductInput: product,
        },
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.data.createProduct).toEqual(product);
      });
  });

  it('POST /graphql products', () => {
    const createProductMutation = `
    query($productId: productId!) {
      products(productId: $productId) {
        items {
          productId
        }
      }
    }
    `;
    request(server)
      .post('/graphql')
      .send({
        query: createProductMutation,
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.data.products.items).toEqual(
          MOCK_PRODUCT.map((product) => ({ productId: product.productId })),
        );
      });
  });
});

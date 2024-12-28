import { useProduct } from '@repo/api-client';

export type ProductsPageProps = ReturnType<typeof useProduct> & {
  onAddItemToCart: (productId: string) => void;
};

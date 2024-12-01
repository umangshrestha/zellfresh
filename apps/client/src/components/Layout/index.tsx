import ApolloClientProvider from '../ApolloClient.provider';
import { AddItemToCartProvider } from '../Cart/AddItemToCart/AddItemToCart.provider.tsx';
import { ProductFilterProvider } from '../Product/ProductFilter/ProductFilter.provider';
import { Layout } from './Layout';
import type { LayoutProps } from './Layout.types';

export type { LayoutProps };

const LayoutWithProvider = () => (
  <ApolloClientProvider>
    <AddItemToCartProvider>
      <ProductFilterProvider>
        <Layout />
      </ProductFilterProvider>
    </AddItemToCartProvider>
  </ApolloClientProvider>
);

export default LayoutWithProvider;

import ApolloClientProvider from '../ApolloClient.provider';
import { ProductFilterProvider } from '../Product/ProductFilter/ProductFilter.provider';
import { Layout } from './Layout';
import type { LayoutProps } from './Layout.types';

export type { LayoutProps };

const LayoutWithProvider = () => (
  <ApolloClientProvider>
    <ProductFilterProvider>
      <Layout />
    </ProductFilterProvider>
  </ApolloClientProvider>
);

export default LayoutWithProvider;

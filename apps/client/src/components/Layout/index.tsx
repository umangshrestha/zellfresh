import { ProductFilterProvider } from '../Product/ProductFilter/ProductFilter.provider';
import { Layout } from './Layout';

import type { LayoutProps } from './Layout.types';

export type { LayoutProps };

const LayoutWithProvider = () => (
  <ProductFilterProvider>
    <Layout />
  </ProductFilterProvider>
);

export default LayoutWithProvider;

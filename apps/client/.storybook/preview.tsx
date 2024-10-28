import type { Preview } from '@storybook/react';
import { CartIconProvider } from '../src/components/Cart/CartIcon';
import { NotificationProvider } from '../src/components/Notification';

import { ProductFilterProvider } from '../src/components/Product/ProductFilter/ProductFilter.provider';
import '../src/index.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;

export const decorators = [
  (Story) => (
    <NotificationProvider>
      <CartIconProvider>
        <ProductFilterProvider>
          <Story />
        </ProductFilterProvider>
      </CartIconProvider>
    </NotificationProvider>
  ),
];

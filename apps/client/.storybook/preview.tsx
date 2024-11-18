import type { Preview } from '@storybook/react';
import { NotificationProvider } from '../src/components/Notification';

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
      <Story />
    </NotificationProvider>
  ),
];

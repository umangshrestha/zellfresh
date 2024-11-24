import type { Preview } from '@storybook/react';
import { NotificationProvider } from '../src/components/Notification';

import { RouterProvider, createMemoryRouter } from 'react-router-dom';
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
  (Story, context) => {
    const routes = context.parameters.routes || [
      { path: '/', element: <Story /> },
      { path: '*', to: '/' },
    ];
    const initialEntries = context.parameters.initialEntries || ['/'];

    const router = createMemoryRouter(routes, { initialEntries });

    return <RouterProvider router={router} />;
  },
  (Story) => (
    <NotificationProvider>
      <Story />
    </NotificationProvider>
  ),
];

import type { Meta, StoryObj } from '@storybook/react';
import { CATEGORIES_MOCK_DATA } from '../Categories.mock';
import { CategoriesSection } from './CategoriesSection';

const meta = {
  title: 'Category/Section',
  component: CategoriesSection,
  tags: ['autodocs'],
} as Meta<typeof CategoriesSection>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    categories: CATEGORIES_MOCK_DATA,
  },
};

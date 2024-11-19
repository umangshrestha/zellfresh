import type { Meta, StoryObj } from '@storybook/react';
import { CATEGORIES_MOCK_DATA } from '../Categories.mock';
import { CategoriesCollapsableButton } from './CategoriesCollapsableButton';

const meta = {
  title: 'Category/List',
  component: CategoriesCollapsableButton,
  tags: ['autodocs'],
} as Meta<typeof CategoriesCollapsableButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    categories: CATEGORIES_MOCK_DATA,
    onClick: (url: string) => {
      console.log(url);
    },
  },
};

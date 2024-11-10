import type { Meta, StoryObj } from '@storybook/react';
import { CategoriesSection } from './CategoriesSection';
import { SUPPORTED_CATEGORIES } from '../../../config/categories';


const meta = {
  title: 'Category/Section',
  component: CategoriesSection,
  tags: ['autodocs'],
} as Meta<typeof CategoriesSection>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    categories: SUPPORTED_CATEGORIES,
    onClick: (url: string) => {
      console.log(url);
    },
  },
};

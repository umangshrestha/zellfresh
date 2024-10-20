import type { Meta, StoryObj } from '@storybook/react';

const CartIconWithProvider = (props: CartIconProps & {count: number}) => {
  const {setCartCount} = useCartIcon();

  useEffect(() => {
    setCartCount(props.count);
  }, [props.count, setCartCount]);
  
  return (
  <div style={{ backgroundColor: 'gray' }}>
    <CartIcon {...props} />
  </div>);
};

import { CartIcon } from './CartIcon';
import { CartIconProps } from './CartIcon.types';
import { useEffect } from 'react';
import { useCartIcon } from './CartCount.hooks';
const meta = {
  title: 'Cart/Icon',
  component: CartIconWithProvider,
  tags: ['autodocs'],
} as Meta<typeof CartIconWithProvider>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
  args: {
    count: 0,
    onClick: () => {},
  },
};

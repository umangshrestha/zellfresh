import { fireEvent, render, screen } from '@testing-library/react';
import { CartIcon } from './CartIcon';
import { CartIconProps } from './CartIcon.types';

describe('CartIcon', () => {
  const defaultProps: CartIconProps = {
    cartCount: 5,
    onClick: jest.fn(),
  };

  it('should render correctly', () => {
    render(<CartIcon {...defaultProps} />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('should display the correct cart count', () => {
    render(<CartIcon {...defaultProps} />);
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('should call onClick handler when clicked', () => {
    render(<CartIcon {...defaultProps} />);
    fireEvent.click(screen.getByRole('button'));
    expect(defaultProps.onClick).toHaveBeenCalledTimes(1);
  });
});

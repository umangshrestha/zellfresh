import { render, screen } from '@testing-library/react';
import { Badge } from './Badge';
import { BadgeProps } from './Badge.types';

describe('Badge', () => {
  const defaultProps: BadgeProps = {
    badgeText: 'New',
  };

  it('should render correctly with badgeText', () => {
    render(<Badge {...defaultProps} />);
    expect(screen.getByText('New')).toBeInTheDocument();
  });

  it('should return null when badgeText is null', () => {
    const { container } = render(<Badge badgeText={null} />);
    expect(container.firstChild).toBeNull();
  });
});

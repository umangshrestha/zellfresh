import { EmptyPageProps } from '../../EmptyPage';
import { CartMutation } from '..';

export interface CartListProps extends CartMutation {
  onEmptyStateClicked: EmptyPageProps['onClick'];
}

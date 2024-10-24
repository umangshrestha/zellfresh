import { CartMutation } from '..';
import { EmptyPageProps } from '../../EmptyPage';

export interface CartListProps extends CartMutation {
  onEmptyStateClicked: EmptyPageProps['onClick'];
}

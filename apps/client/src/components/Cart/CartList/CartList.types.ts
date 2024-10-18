import { EmptyPageProps } from '../../EmptyPage';
import { UseCartMutation } from '../hooks/useCart';

export interface CartListProps extends UseCartMutation {
  onEmptyStateClicked: EmptyPageProps['onClick'];
}

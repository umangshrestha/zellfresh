import { CartMutationFunctions } from '../../Cart';
import { EmptyPageProps } from '../../EmptyPage';
import { ProductItemType } from '../ProductItem';

export type ProductListProps = {
  data: ProductItemType[];
  loading: boolean;
  onEmptyStateClicked: EmptyPageProps['onClick'];
} & CartMutationFunctions;

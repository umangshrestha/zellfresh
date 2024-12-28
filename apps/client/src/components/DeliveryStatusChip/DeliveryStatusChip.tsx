import Chip from '@mui/material/Chip';
import { DeliveryStatus } from '@repo/api-client';
import { DeliveryStatusProps } from './DeliveryStatusChip.types.ts';

export const DeliveryStatusChip = ({ deliveryStatus }: DeliveryStatusProps) => {
  const props = { label: `Status: ${deliveryStatus}`, textcolor: 'white' };
  switch (deliveryStatus) {
    case DeliveryStatus.Delivered:
      return <Chip {...props} color="success" size="medium" />;
    case DeliveryStatus.Pending:
      return <Chip {...props} color="info" size="medium" />;
    case DeliveryStatus.Shipped:
      return <Chip {...props} color="primary" size="medium" />;
    case DeliveryStatus.Refunded:
      return <Chip {...props} color="warning" size="medium" />;
    case DeliveryStatus.Processing:
      return <Chip {...props} color="secondary" size="medium" />;
    default:
      return <Chip {...props} color="error" size="medium" />;
  }
};

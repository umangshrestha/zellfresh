import { useNavigate, useParams } from 'react-router-dom';
import OrderPlaced from '../../../components/Order/OrderPlaced';

export const OrderPlacedPage = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  if (orderId === undefined) {
    navigate('/');
    return null;
  } else {
    return (
      <OrderPlaced
        orderId={orderId}
        onClick={() => {
          navigate(`/orders/${orderId}`);
        }}
      />
    );
  }
};

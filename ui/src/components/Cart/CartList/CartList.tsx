import Box from "@mui/material/Box";
import CartItem from "../CartItem";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { useNotification } from "../../Notification";
import CartItemSkeleton from "../CartItemSkeleton";
import { CartListProps } from "./CartList.types";

export const CartList = ({
  data,
  loading,
  error,
  onRemove,
  onChange,
}: CartListProps) => {
  const { setNotification } = useNotification();

  if (error) {
    setNotification({
      message: error.message,
      severity: "error",
    });
  }

  if (loading) {
    return (
      <Box justifyContent="space-around" sx={{ maxWidth: "100%", padding: 2 }}>
        <List>
          {Array(4)
            .fill(0)
            .map((_, index) => (
              <ListItem key={index}>
                <CartItemSkeleton />
              </ListItem>
            ))}
        </List>
        <Box sx={{ padding: 2 }}>Total: 0</Box>
      </Box>
    );
  }

  if (!data || data.length === 0) {
    return <Box sx={{ padding: 2 }}>No products available</Box>;
  }

  const totalPrice = data.reduce(
    (acc: number, product) => acc + product.price * product.quantity,
    0,
  );

  return (
    <Box justifyContent="space-around" sx={{ maxWidth: "100%", padding: 2 }}>
      <Box sx={{ padding: 2 }}>
        <List>
          {data.map((product) => (
            <ListItem key={product.id}>
              <CartItem {...product} onRemove={onRemove} onChange={onChange} />
            </ListItem>
          ))}
        </List>
        Total: {totalPrice}
      </Box>
    </Box>
  );
};

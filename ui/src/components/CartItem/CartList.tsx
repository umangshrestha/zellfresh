import Box from "@mui/material/Box";
import * as React from "react";
import Product from "./CartItem";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { getAvailableCartItems } from "@/components/CartItem/query";

export default async function Cart() {
  const filteredProducts = await getAvailableCartItems();
  if (!filteredProducts || filteredProducts.length === 0) {
    return <Box sx={{ padding: 2 }}>No products available</Box>;
  }

  return (
    <Box justifyContent="space-around" sx={{ maxWidth: "100%", padding: 2 }}>
      <List>
        {filteredProducts.map((product, index) => (
          <ListItem key={index}>
            <Product key={index} {...product} />
          </ListItem>
        ))}
      </List>
      <Box sx={{ padding: 2 }}>
        Total:{" "}
        {filteredProducts.reduce((acc, product) => acc + product.price, 0)}
      </Box>
    </Box>
  );
}

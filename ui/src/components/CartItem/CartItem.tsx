import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { ProductType as ProductProps } from "./types";
import Box from "@mui/material/Box";
import Badge from "@/components/Badge";
import Viel from "@/components/Viel";
export default function Product({
  name,
  price,
  imageUrl,
  quantity,
}: ProductProps) {
  const imageSize = 50;
  const isProductAvailable = quantity > 0;
  // const totalPrice = price * quantity;

  return (
    <Viel enable={!isProductAvailable}>
      {!isProductAvailable ? <Badge badgeText="Out of Order" /> : null}
      <Card
        sx={{
          display: "flex",
          alignItems: "center",
          minWidth: 600,
          padding: 1,
        }}
      >
        <CardMedia title={name}>
          <Image
            src={imageUrl}
            alt={name}
            width={imageSize}
            height={imageSize}
          />
        </CardMedia>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            flexGrow: 1,
            pl: 2,
          }}
        >
          <CardContent sx={{ padding: "0px" }}>
            <Typography gutterBottom variant="h6" component="div">
              {name}
            </Typography>
          </CardContent>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            justifyContent: "space-between",
            pl: 2,
          }}
        >
          <Typography gutterBottom variant="h6" component="div">
            ${price} x {quantity}
          </Typography>

          <CardActions
            sx={{ display: "flex", justifyContent: "flex-end", padding: 0 }}
          >
            <Button color="error" sx={{ minWidth: "40px" }}>
              <DeleteIcon />
            </Button>
            <Button color="primary" sx={{ minWidth: "40px" }}>
              <AddIcon />
            </Button>
          </CardActions>
        </Box>
      </Card>
    </Viel>
  );
}

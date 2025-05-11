import { useContext, useState } from "react";
//mui
import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  CircularProgress,
  IconButton,
  Typography,
} from "@mui/material";
//icons
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
//type
import { Cart, Product } from "./Products";
import { ProductContext } from "../App";

interface Props {
  product: Product;
  rowMode?: boolean;
}

function CardProduct({ product, rowMode = false }: Props) {
  const productContext = useContext(ProductContext);

  const [productState, setProductState] = useState<Product>(product);

  function addToCart(productId: number, quantity: number) {
    setProductState({ ...productState, loading: true });
    fetch("/cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ productId, quantity }),
    }).then(async (response) => {
      if (response.ok) {
        const cart: Cart = await response.json();
        productContext.setCart(cart);

        setProductState({
          ...productState,
          loading: false,
          itemInCart: (productState.itemInCart || 0) + quantity,
        });
      }
    });
  }
  return (
    <Card
      key={productState.id}
      style={{
        width: "100%",
        overflow: "unset",
      }}
    >
      <Box sx={rowMode ? { display: "flex", flexDirection: "row" } : {}}>
        <CardMedia component="img" height="150" image={productState.imageUrl} />
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            {productState.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit,
          </Typography>
        </CardContent>
        <CardActions>
          <Typography variant="h6" component="div">
            ${productState.price}
          </Typography>
          <Box flexGrow={1} />
          <Box
            position="relative"
            display="flex"
            flexDirection="row"
            alignItems="center"
          >
            <Box
              position="absolute"
              left={0}
              right={0}
              top={0}
              bottom={0}
              textAlign="center"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              {productState.loading && <CircularProgress size={20} />}
            </Box>
            <IconButton
              disabled={
                productState.loading || (productState.itemInCart || 0) === 0
              }
              aria-label="delete"
              size="small"
              onClick={() => addToCart(productState.id, -1)}
            >
              <RemoveIcon fontSize="small" />
            </IconButton>

            <Typography variant="body1" component="div" mx={1}>
              {productState.itemInCart || 0}
            </Typography>

            <IconButton
              disabled={productState.loading}
              aria-label="add"
              size="small"
              onClick={() => addToCart(productState.id, 1)}
            >
              <AddIcon fontSize="small" />
            </IconButton>
          </Box>
        </CardActions>
      </Box>
    </Card>
  );
}

export default CardProduct;

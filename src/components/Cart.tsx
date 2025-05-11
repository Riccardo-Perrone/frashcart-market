import { useContext } from "react";
//MUI
import { Box, Button, Typography } from "@mui/material";
//context
import { ProductContext } from "../App";
//components
import CardProduct from "./CardProduct";
//style
import { buttonStyles } from "../utils/buttonStyle";

interface Props {
  handleClick: () => void;
}

function Cart({ handleClick }: Props) {
  const productContext = useContext(ProductContext);

  return (
    <Box display={"flex"} gap={"20px"} p={2} height={"100%"}>
      <Box
        width={"80%"}
        padding={2}
        bgcolor={"var(--highlighted-secondary)"}
        borderRadius={2}
        display={"flex"}
        flexDirection={"column"}
        gap={2}
        overflow={"scroll"}>
        {productContext.cart.items.length > 0 ? (
          <>
            {productContext.cart.items.map((element) => (
              <CardProduct
                rowMode
                key={element.product.id}
                product={{
                  ...element.product,
                  itemInCart: element.quantity,
                }}
              />
            ))}
          </>
        ) : (
          <Typography variant="h6" component="div">
            Il tuo carrello è vuoto
          </Typography>
        )}
      </Box>
      {productContext.cart.items.length > 0 && (
        <Box
          width={"20%"}
          padding={2}
          bgcolor={"var(--highlighted-secondary)"}
          borderRadius={2}
          height={"fit-content"}>
          <Typography variant="h6" noWrap component="div">
            Total: $ {productContext.cart.totalPrice.toFixed(2)}
          </Typography>
          <Button onClick={handleClick} sx={buttonStyles}>
            <Typography textTransform={"none"} color={"#fff"}>
              Checkout
            </Typography>
          </Button>
        </Box>
      )}
    </Box>
  );
}

export default Cart;

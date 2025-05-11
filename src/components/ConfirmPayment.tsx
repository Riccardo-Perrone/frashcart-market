import { useContext, useState } from "react";
//MUI
import { Box, Button, Stack, Typography } from "@mui/material";
//Type
import { CheckoutInfo } from "./Checkout";
//context
import { ProductContext, defaultState } from "../App";
//style
import { buttonStyles } from "../utils/buttonStyle";
//componets
import SnackbarAlert from "./SnackbarAlert";

interface Props {
  checkoutInfo: CheckoutInfo;
}

function ConfirmPayment({ checkoutInfo }: Props) {
  const productContext = useContext(ProductContext);
  const [paymentError, setPaymentError] = useState<boolean>(false);

  //censura i dati della carta
  function hiddeCardNumber(cardNumber: string) {
    if (!cardNumber) return "";
    const lengthString = cardNumber.length - 4;
    const hiddeSection = "*".repeat(lengthString);
    const cardNumberHidden = hiddeSection + cardNumber.slice(-4);
    return cardNumberHidden;
  }

  //controlla se un dato non e' stato inserito dall'utente
  function checkValueCheckout() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const checkoutInfoTemp: any = checkoutInfo;

    return (
      !!Object.keys(checkoutInfo.deliveryAddress).find(
        (element: string) => !checkoutInfoTemp.deliveryAddress[element]
      ) ||
      !!Object.keys(checkoutInfo.paymentInfo).find(
        (element: string) => !checkoutInfoTemp.paymentInfo[element]
      )
    );
  }

  function sendPayment() {
    fetch("/orders", {
      method: "POST",
    }).then(async (response) => {
      if (response.ok) {
        productContext.setCart(defaultState.cart);
        productContext.setPaymentSuccess(true);
        productContext.setOpenCheckout(false);
      } else {
        setPaymentError(true);
      }
    });
  }

  return (
    <Box display={"flex"} flexDirection={"column"} gap={"20px"} height={"100%"}>
      {!checkValueCheckout() ? (
        <Box
          width={"100%"}
          padding={2}
          display={"flex"}
          flexDirection={"column"}
          gap={2}
        >
          <Box display={"flex"} flexDirection={"row"} gap={"15px"}>
            <Typography fontWeight={"bold"}>Customer:</Typography>
            <Typography>
              {`${checkoutInfo.deliveryAddress.fullName} ${checkoutInfo.deliveryAddress.telephone}`}
            </Typography>
          </Box>
          <Box display={"flex"} flexDirection={"row"} gap={"15px"}>
            <Typography fontWeight={"bold"}>Indirizzo di consegna:</Typography>
            <Box display={"flex"} flexDirection={"column"}>
              <Typography>{`${checkoutInfo.deliveryAddress.address}`}</Typography>
              <Typography>
                {`${checkoutInfo.deliveryAddress.region}, ${checkoutInfo.deliveryAddress.city}, ${checkoutInfo.deliveryAddress.province} ${checkoutInfo.deliveryAddress.pCode}`}
              </Typography>
            </Box>
          </Box>
          <Box display={"flex"} flexDirection={"row"} gap={"15px"}>
            <Typography fontWeight={"bold"}>Metodo di pagamento:</Typography>
            <Box display={"flex"} flexDirection={"column"}>
              <Typography>
                {`Card number: ${hiddeCardNumber(
                  checkoutInfo.paymentInfo.cardNumber
                )}`}
              </Typography>
            </Box>
          </Box>

          <Stack
            direction={"row"}
            alignItems={"center"}
            gap={2}
            alignSelf={"flex-end"}
          >
            <Typography>{`Total: ${productContext.cart.totalPrice.toFixed(
              2
            )}$`}</Typography>
            <Button sx={buttonStyles} onClick={sendPayment}>
              Payment
            </Button>
          </Stack>
        </Box>
      ) : (
        <Typography>Inserire tutti i dati per poter procedere</Typography>
      )}
      <SnackbarAlert
        message="Errore nel pagamento, per favore riprovare"
        open={paymentError}
        setOpen={setPaymentError}
        severity="error"
      />
    </Box>
  );
}

export default ConfirmPayment;

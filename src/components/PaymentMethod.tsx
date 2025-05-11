import { Dispatch, SetStateAction } from "react";
//MUI
import { Box, TextField } from "@mui/material";
//Type
import { CheckoutInfo } from "./Checkout";

interface Props {
  checkoutInfo: CheckoutInfo;
  setCheckoutInfo: Dispatch<SetStateAction<CheckoutInfo>>;
}

export type PaymentInfo = {
  cardNumber: string;
  nameCard: string;
  date: Date | string;
  cvv: string;
};

function PaymentMethod({ checkoutInfo, setCheckoutInfo }: Props) {
  function handleChange(key: string, value: string) {
    setCheckoutInfo({
      ...checkoutInfo,
      paymentInfo: { ...checkoutInfo.paymentInfo, [key]: value },
    });
  }

  return (
    <Box display={"flex"} flexDirection={"column"} gap={"20px"} height={"100%"}>
      <Box
        width={"100%"}
        padding={2}
        display={"flex"}
        flexDirection={"column"}
        gap={2}>
        <TextField
          label="Card number"
          type="number"
          onChange={(event) => {
            handleChange("cardNumber", event.target.value);
          }}
        />
        <TextField
          label="Name on the Card"
          onChange={(event) => {
            handleChange("nameCard", event.target.value);
          }}
        />
        <TextField
          label="Expiration date"
          type="date"
          InputLabelProps={{
            shrink: true,
          }}
          onChange={(event) => {
            handleChange("date", event.target.value);
          }}
        />

        <TextField
          type="number"
          sx={{ width: "30%" }}
          label="Security code (CVV)"
          onChange={(event) => {
            handleChange("cvv", event.target.value);
          }}
        />
      </Box>
    </Box>
  );
}

export default PaymentMethod;

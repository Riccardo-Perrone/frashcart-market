import { Dispatch, SetStateAction } from "react";
//MUI
import { Box, TextField } from "@mui/material";
//Type
import { CheckoutInfo } from "./Checkout";

interface Props {
  checkoutInfo: CheckoutInfo;
  setCheckoutInfo: Dispatch<SetStateAction<CheckoutInfo>>;
}

export type DeliveryInfo = {
  region: string;
  fullName: string;
  telephone: string;
  address: string;
  pCode: string;
  city: string;
  province: string;
};

function DeliveryAddress({ checkoutInfo, setCheckoutInfo }: Props) {
  function handleChange(key: string, value: string) {
    setCheckoutInfo({
      ...checkoutInfo,
      deliveryAddress: { ...checkoutInfo.deliveryAddress, [key]: value },
    });
  }

  return (
    <Box display={"flex"} flexDirection={"column"} gap={"20px"} height={"100%"}>
      <Box
        width={"100%"}
        padding={2}
        display={"flex"}
        flexDirection={"column"}
        gap={2}
      >
        <TextField
          label="State/Region"
          onChange={(event) => {
            handleChange("region", event.target.value);
          }}
        />
        <TextField
          label="Full name (first and last name)"
          onChange={(event) => {
            handleChange("fullName", event.target.value);
          }}
        />
        <TextField
          type="number"
          label="Telephone number"
          onChange={(event) => {
            handleChange("telephone", event.target.value);
          }}
        />
        <TextField
          label="Address"
          onChange={(event) => {
            handleChange("address", event.target.value);
          }}
        />
        <Box display={"flex"} flexDirection={"row"} gap={"5%"}>
          <TextField
            type="number"
            sx={{ width: "25%" }}
            label="Postal Code"
            onChange={(event) => {
              handleChange("pCode", event.target.value);
            }}
          />
          <TextField
            sx={{ width: "70%" }}
            label="City"
            onChange={(event) => {
              handleChange("city", event.target.value);
            }}
          />
        </Box>
        <TextField
          label="Province"
          onChange={(event) => {
            handleChange("province", event.target.value);
          }}
        />
      </Box>
    </Box>
  );
}

export default DeliveryAddress;

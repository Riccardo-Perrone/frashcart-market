import React, { useContext, useState } from "react";
//mui
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Modal,
} from "@mui/material";
//context
import { ProductContext } from "../App";
//components
import Cart from "./Cart";
import DeliveryAddress, { DeliveryInfo } from "./DeliveryAddress";
import PaymentMethod, { PaymentInfo } from "./PaymentMethod";
import ConfirmPayment from "./ConfirmPayment";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  height: "90%",
  bgcolor: "var(--beige)",
  p: 2,
  borderRadius: "8px",
};

export type CheckoutInfo = {
  deliveryAddress: DeliveryInfo;
  paymentInfo: PaymentInfo;
};

function Checkout() {
  const productContext = useContext(ProductContext);
  const [cartStep, setCartStep] = useState<boolean>(true);
  const [expanded, setExpanded] = useState<string>("panel1");

  const [checkoutInfo, setCheckoutInfo] = useState<CheckoutInfo>({
    deliveryAddress: {
      region: "",
      fullName: "",
      telephone: "",
      address: "",
      pCode: "",
      city: "",
      province: "",
    },
    paymentInfo: {
      cardNumber: "",
      cvv: "",
      date: "",
      nameCard: "",
    },
  });

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : "");
    };
  return (
    <Modal
      open={productContext.openCheckout}
      disableAutoFocus={true}
      onClose={() => {
        setCartStep(true);
        productContext.setOpenCheckout(false);
      }}>
      <Box sx={style}>
        {cartStep ? (
          <Cart handleClick={() => setCartStep(false)} />
        ) : (
          <Box>
            <Accordion
              expanded={expanded === "panel1"}
              onChange={handleChange("panel1")}>
              <AccordionSummary
                aria-controls="panel1d-content"
                id="panel1d-header">
                Delivery address
              </AccordionSummary>
              <AccordionDetails sx={{ padding: 0 }}>
                <DeliveryAddress
                  checkoutInfo={checkoutInfo}
                  setCheckoutInfo={setCheckoutInfo}
                />
                {/*TODO the delivery slot selection */}
              </AccordionDetails>
            </Accordion>
            <Accordion
              expanded={expanded === "panel2"}
              onChange={handleChange("panel2")}>
              <AccordionSummary
                aria-controls="panel2d-content"
                id="panel2d-header">
                Payment Method
              </AccordionSummary>
              <AccordionDetails>
                <PaymentMethod
                  checkoutInfo={checkoutInfo}
                  setCheckoutInfo={setCheckoutInfo}
                />
              </AccordionDetails>
            </Accordion>
            <Accordion
              expanded={expanded === "panel3"}
              onChange={handleChange("panel3")}>
              <AccordionSummary
                aria-controls="panel3d-content"
                id="panel3d-header">
                Confirm Payment
              </AccordionSummary>
              <AccordionDetails>
                <ConfirmPayment checkoutInfo={checkoutInfo} />
              </AccordionDetails>
            </Accordion>
          </Box>
        )}
      </Box>
    </Modal>
  );
}

export default Checkout;

import { Cart, Products } from "./components/Products.tsx";
import { Box, CssBaseline } from "@mui/material";
import SearchAppBar from "./components/SearchAppBar.tsx";
import { Categories } from "./components/Categories.tsx";
import {
  Context,
  Dispatch,
  SetStateAction,
  createContext,
  useState,
} from "react";
import Checkout from "./components/Checkout.tsx";
import SnackbarAlert from "./components/SnackbarAlert.tsx";

export type Filters = {
  search: string;
  category: string;
};

interface ValueContext {
  cart: Cart;
  setCart: Dispatch<SetStateAction<Cart>>;
  searchText: string;
  setSearchText: Dispatch<SetStateAction<string>>;
  categorySelected: string;
  setCategorySelected: Dispatch<SetStateAction<string>>;
  openCheckout: boolean;
  setOpenCheckout: Dispatch<SetStateAction<boolean>>;
  setPaymentSuccess: Dispatch<SetStateAction<boolean>>;
}

export const defaultState = {
  cart: { items: [], totalPrice: 0, totalItems: 0 },
  setCart: () => {},
  searchText: "",
  setSearchText: () => {},
  categorySelected: "",
  setCategorySelected: () => {},
  openCheckout: false,
  setOpenCheckout: () => {},
  setPaymentSuccess: () => {},
};

//Ho creato un context per facilitarmi il passaggio delle info necesarrie tra i vai componenti
export const ProductContext: Context<ValueContext> =
  createContext<ValueContext>(defaultState);

function App() {
  const [cart, setCart] = useState<Cart>(defaultState.cart);
  const [searchText, setSearchText] = useState<string>("");
  const [categorySelected, setCategorySelected] = useState<string>("");
  const [openCheckout, setOpenCheckout] = useState<boolean>(
    defaultState.openCheckout
  );
  const [paymentSuccess, setPaymentSuccess] = useState<boolean>(false);

  return (
    <ProductContext.Provider
      value={{
        cart,
        setCart,
        openCheckout,
        setOpenCheckout,
        setPaymentSuccess,
        searchText,
        setSearchText,
        categorySelected,
        setCategorySelected,
      }}
    >
      <Box display="flex" flexDirection="column">
        <CssBaseline />
        <SearchAppBar />
        <Box flex={1} display="flex" flexDirection="row">
          <Categories />

          <Box flex={1}>
            <Products />
          </Box>
        </Box>
      </Box>
      <Checkout />
      <SnackbarAlert
        message="Pagamento effettuato con successo"
        open={paymentSuccess}
        setOpen={setPaymentSuccess}
        severity="success"
      />
    </ProductContext.Provider>
  );
}

export default App;

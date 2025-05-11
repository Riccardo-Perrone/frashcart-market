import { useContext } from "react";
//mui
import { styled, alpha } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import {
  AppBar,
  Badge,
  Box,
  IconButton,
  InputBase,
  Toolbar,
  Typography,
} from "@mui/material";
//icons
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
//context
import { ProductContext } from "../App";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  marginRight: theme.spacing(2),
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));
//reference al timeout dell'onchange
let timeout: NodeJS.Timeout;
export default function SearchAppBar() {
  const productContext = useContext(ProductContext);

  //callback del valore inserito nel search con un ritardo per evitare rerender inutili
  function onChangeTimeout(value: string) {
    clearTimeout(timeout);
    timeout = setTimeout(() => productContext.setSearchText(value), 300);
  }
  return (
    <Box position={"sticky"} top={0} zIndex={10}>
      <AppBar position="relative" sx={{ backgroundColor: "var(--brown)" }}>
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}>
            FreshCart Market
          </Typography>
          <Search>
            <SearchIconWrapper>
              {/* TODO: caricamento da mettere */}
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              onChange={(e) => onChangeTimeout(e.target.value)}
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
          <Box display="flex" flexDirection="row" mx={2}>
            <Typography variant="h6" noWrap component="div" mr={2}>
              Total:
            </Typography>
            <Typography variant="h6" noWrap component="div">
              $ {(productContext.cart.totalPrice || 0).toFixed(2)}
            </Typography>
          </Box>
          <Badge
            badgeContent={productContext.cart.totalItems || 0}
            color="secondary">
            <IconButton onClick={() => productContext.setOpenCheckout(true)}>
              <ShoppingCartIcon htmlColor="white" />
            </IconButton>
          </Badge>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

import { useContext, useEffect, useState } from "react";
//mui
import { Box, Grid, CircularProgress, Typography } from "@mui/material";
//components
import { HeavyComponent } from "./HeavyComponent.tsx";
import CardProduct from "./CardProduct.tsx";
//context
import { ProductContext } from "../App.tsx";

export type Product = {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
  category: string;
  itemInCart: number;
  loading: boolean;
};

export type Cart = {
  items: { product: Product; quantity: number }[];
  totalPrice: number;
  totalItems: number;
};

//prodoti visibili per numero pagina
const productPerPage = 10;
let page = 1;

export const Products = () => {
  const productContext = useContext(ProductContext);

  //tutti i prodotti che vengono visualizzati
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    page = 1;
    getProducts();
  }, [productContext.searchText, productContext.categorySelected]);

  //ho separato la fetch in una funzione separata in modo da poterla richiamare in caso di future necessita'
  function getProducts() {
    setLoading(true);
    fetch(
      `/products?limit=${page * productPerPage}&q=${
        productContext.searchText
      }&category=${productContext.categorySelected}`
    )
      .then((response) => response.json())
      .then((data) => {
        setProducts(data.products);
        setLoading(false);
      });
  }

  function handleScroll() {
    //controllo se sono arrivato alla fine della pagina
    if (
      window.innerHeight + Math.ceil(document.documentElement.scrollTop) >=
      document.documentElement.scrollHeight
    ) {
      page++;
      getProducts();
    }
  }

  return (
    <Box>
      <Grid container spacing={2} p={2}>
        {products.length === 0 && (
          <Typography variant="body1" m="3em">
            Nessun prodotto disponibile.
          </Typography>
        )}
        {products.map((product) => (
          <Grid item xs={4} key={product.id}>
            {/* Do not remove this */}
            <HeavyComponent />
            <CardProduct product={product} />
          </Grid>
        ))}
      </Grid>
      <Box display="flex" justifyContent={"center"} minHeight={50}>
        {loading && <CircularProgress />}
      </Box>
    </Box>
  );
};

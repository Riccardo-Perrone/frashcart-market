import { useContext, useState } from "react";
//mui
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
//context
import { ProductContext } from "../App";

const drawerWidth = 180;

const categories = [
  "Fruit",
  "Vegetables",
  "Dairy",
  "Bakery",
  "Meat",
  "Seafood",
  "Snacks",
  "Beverages",
];

export const Categories = () => {
  const productContext = useContext(ProductContext);

  const [categorySelected, setCategorySelected] = useState<string>("");

  function selectCategory(category: string) {
    //se viene cliccata una cetegoria gia' selezionata questa viene DE-selezionata
    const newCategory = category === categorySelected ? "" : category;
    productContext.setCategorySelected(newCategory);
    setCategorySelected(newCategory);
  }

  return (
    <Box minWidth={drawerWidth} sx={{ borderRight: "1px solid grey" }}>
      <List>
        {categories.map((text) => (
          <ListItem key={text} disablePadding>
            <ListItemButton
              selected={categorySelected === text}
              onClick={() => selectCategory(text)}
            >
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

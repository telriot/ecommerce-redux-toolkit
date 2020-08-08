import React from "react";
import { Container, Divider } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import AllProducts from "./AllProducts";
import AllProductsFilters from "../filters/AllProductsFilters";
const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
  },
}));
function MainView() {
  const classes = useStyles();
  return (
    <Container className={classes.container}>
      <AllProductsFilters />
      <Divider orientation="vertical" flexItem />
      <AllProducts />
    </Container>
  );
}

export default MainView;

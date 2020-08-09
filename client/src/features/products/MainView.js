import React from "react";
import { Container, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import AllProducts from "./AllProducts";
import AllProductsFilters from "../filters/AllProductsFilters";
const useStyles = makeStyles((theme) => ({
  grid: {
    display: "flex",
  },
}));
function MainView() {
  const classes = useStyles();
  return (
    <Container>
      <Grid container className={classes.grid}>
        <Grid item xs={4}>
          <AllProductsFilters />
        </Grid>

        <Grid item xs={8}>
          <AllProducts />
        </Grid>
      </Grid>
    </Container>
  );
}

export default MainView;

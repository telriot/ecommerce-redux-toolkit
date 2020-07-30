import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllProducts,
  selectAllProducts,
  selectIsFetchingProducts,
} from "./productsSlice";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import ProductCard from "./ProductCard";
const useStyles = makeStyles((theme) => ({
  grid: {
    margin: "2rem 0",
  },
}));
function AllProducts() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const products = useSelector(selectAllProducts);
  const isFetching = useSelector(selectIsFetchingProducts);
  React.useEffect(() => {
    if (isFetching === "idle") dispatch(fetchAllProducts());
  }, [dispatch, isFetching]);

  return (
    <Grid container className={classes.grid}>
      {isFetching === "pending"
        ? "Loading..."
        : products &&
          products.map((product) => (
            <Grid item sm={6} md={4}>
              <ProductCard key={product._id} product={product} />
            </Grid>
          ))}
    </Grid>
  );
}

export default AllProducts;

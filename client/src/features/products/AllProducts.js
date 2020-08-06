import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllProducts,
  selectAllProducts,
  selectIsFetchingProducts,
  pageChanged,
} from "./productsSlice";
import { selectAuthorizedUser } from "../auth/authSlice";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import ProductCard from "./ProductCard";
import CustomPagination from "../shared/CustomPagination";
import { fetchWishlistItems } from "../dashboard/dashboardSlice";
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
  const totalPages = useSelector((state) => state.products.totalPages);
  const currentPage = useSelector((state) => state.products.page);
  const user = useSelector(selectAuthorizedUser);

  const handlePageChange = (e, page) => {
    dispatch(pageChanged(page));
  };
  React.useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch, currentPage]);
  React.useEffect(() => {
    user._id && dispatch(fetchWishlistItems(user._id));
  }, [user._id, dispatch]);

  return (
    <>
      <Grid
        data-testid="component-allproducts"
        container
        className={classes.grid}
      >
        {isFetching === "pending"
          ? "Loading..."
          : products &&
            products.map((product) => (
              <Grid key={product._id} item sm={6} md={4}>
                <ProductCard product={product} />
              </Grid>
            ))}
      </Grid>
      <CustomPagination
        totalPages={totalPages}
        currentPage={currentPage}
        handleChange={handlePageChange}
      />
    </>
  );
}

export default AllProducts;

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllProducts,
  selectAllProducts,
  selectIsFetchingProducts,
  pageChanged,
} from "./productsSlice";
import { selectAuthorizedUser } from "../auth/authSlice";
import { Grid, Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ProductCard from "./ProductCard";
import CustomPagination from "../shared/CustomPagination";
import { fetchWishlistItems } from "../wishlist/wishlistSlice";
import SortSelect from "./SortSelect";
const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    padding: theme.spacing(4),
  },
  grid: { marginBottom: theme.spacing(2) },
  sortSelectDiv: { display: "flex", justifyContent: "flex-end" },
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
    <Container className={classes.container}>
      <div className={classes.sortSelectDiv}>
        <SortSelect />
      </div>
      <Grid
        data-testid="component-allproducts"
        container
        className={classes.grid}
        spacing={3}
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
      {totalPages > 1 && (
        <CustomPagination
          totalPages={totalPages}
          currentPage={currentPage}
          handleChange={handlePageChange}
        />
      )}
    </Container>
  );
}

export default AllProducts;

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Grid, Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { fetchWishlistItems, selectDashboardStatus } from "./dashboardSlice";
import WishlistItem from "./WishlistItem";
import CustomPagination from "../shared/CustomPagination";
import { pageChanged } from "../dashboard/dashboardSlice";

const useStyles = makeStyles((theme) => ({
  grid: {},
  paper: { padding: theme.spacing(3) },
}));

function Wishlist() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state) => state.dashboard.wishlistItems);
  const isFetching = useSelector(selectDashboardStatus);
  const page = useSelector((state) => state.dashboard.wishlistItemsPage);
  const totalPages = useSelector(
    (state) => state.dashboard.wishlistItemsTotalPages
  );
  const wishlistItemsPerPage = useSelector(
    (state) => state.dashboard.wishlistItemsPerPage
  );
  const [wishlistItemsToRender, setWishlistItemsToRender] = React.useState([]);

  const handleChange = (e, page) => {
    dispatch(pageChanged(page));
  };
  React.useEffect(() => {
    dispatch(fetchWishlistItems());
  }, [dispatch]);
  React.useEffect(() => {
    const paginateWishlistItems = (wishlistItems) =>
      wishlistItems
        .filter(
          (wishlistItem, index) =>
            index < page * wishlistItemsPerPage &&
            index >= page * wishlistItemsPerPage - wishlistItemsPerPage
        )
        .map((wishlistItem, index) => (
          <WishlistItem
            key={`wishlist-item-${wishlistItem._id}`}
            product={wishlistItem}
            index={index}
          />
        ));
    setWishlistItemsToRender(paginateWishlistItems(wishlistItems));
  }, [wishlistItems, page, wishlistItemsPerPage]);
  return (
    <Grid container data-testid="wishlist-component">
      <Grid item xs={9}>
        <Typography variant="h5">Wishlist history</Typography>
        <Typography variant="subtitle1">
          Dolor anim minim anim proident occaecat nulla do.
        </Typography>
        <Paper className={classes.paper}>
          {isFetching === "pending" ? "Loading..." : wishlistItemsToRender}
        </Paper>
      </Grid>
      <Grid item xs={3}>
        Right
      </Grid>
      <CustomPagination
        totalPages={totalPages}
        currentPage={page}
        handleChange={handleChange}
      />
    </Grid>
  );
}

export default Wishlist;

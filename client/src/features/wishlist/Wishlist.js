import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { fetchWishlistItems } from "./wishlistSlice";
import { selectDashboardStatus } from "../dashboard/dashboardSlice";
import WishlistItem from "./WishlistItem";
import CustomPagination from "../shared/CustomPagination";
import { pageChanged } from "./wishlistSlice";
import RecentlyViewed from "../recentViews/RecentlyViewed";

const useStyles = makeStyles((theme) => ({
  grid: { marginBottom: theme.spacing(4) },
  subGridRight: {
    paddingLeft: theme.spacing(4),
  },
}));

function Wishlist() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state) => state.wishlist.wishlistItems);
  const isFetching = useSelector(selectDashboardStatus);
  const page = useSelector((state) => state.wishlist.wishlistItemsPage);
  const totalPages = useSelector(
    (state) => state.wishlist.wishlistItemsTotalPages
  );
  const wishlistItemsPerPage = useSelector(
    (state) => state.wishlist.wishlistItemsPerPage
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
      <Grid item xs={8}>
        <Typography variant="h5">Wishlist</Typography>

        {isFetching === "pending" ? (
          "Loading..."
        ) : wishlistItemsToRender.length ? (
          wishlistItemsToRender
        ) : (
          <Typography variant="subtitle1">Your wishlist is empty</Typography>
        )}
      </Grid>
      <Grid className={classes.subGridRight} item xs={4}>
        <RecentlyViewed maxItems={5} />
      </Grid>
      {totalPages > 1 && (
        <CustomPagination
          totalPages={totalPages}
          currentPage={page}
          handleChange={handleChange}
        />
      )}
    </Grid>
  );
}

export default Wishlist;

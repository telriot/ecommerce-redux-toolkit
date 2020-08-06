import React from "react";
import { Button } from "@material-ui/core";

import {
  wishlistItemAdded,
  wishlistItemRemoved,
  updateWishlist,
} from "../dashboard/dashboardSlice";
import { useDispatch, useSelector } from "react-redux";

function WishlistButton({ product }) {
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.dashboard.wishlistItems);
  const handleAddToWishlist = () => {
    dispatch(wishlistItemAdded(product));
    dispatch(updateWishlist());
  };
  const handleRemoveFromWishlist = () => {
    dispatch(wishlistItemRemoved(product));
    dispatch(updateWishlist());
  };
  return wishlist.some((element) => element._id === product._id) ? (
    <Button onClick={handleRemoveFromWishlist}>Remove from Wishlist</Button>
  ) : (
    <Button onClick={handleAddToWishlist}>Add to Wishlist</Button>
  );
}

export default WishlistButton;

import React from "react";
import { Button, IconButton } from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import { makeStyles } from "@material-ui/core/styles";

import {
  wishlistItemAdded,
  wishlistItemRemoved,
  updateWishlist,
} from "../dashboard/dashboardSlice";
import { useDispatch, useSelector } from "react-redux";
import DeleteIcon from "@material-ui/icons/Delete";

const useStyles = makeStyles((theme) => ({}));

function WishlistButton({ product, deleteIcon }) {
  const classes = useStyles();

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
    <IconButton onClick={handleRemoveFromWishlist}>
      {deleteIcon ? (
        <DeleteIcon color="disabled" />
      ) : (
        <FavoriteIcon color="secondary" />
      )}
    </IconButton>
  ) : (
    <IconButton onClick={handleAddToWishlist}>
      <FavoriteBorderIcon color="disabled" />
    </IconButton>
  );
}

export default WishlistButton;

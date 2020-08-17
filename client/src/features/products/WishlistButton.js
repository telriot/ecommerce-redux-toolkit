import React from "react";
import { IconButton } from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";

import {
  wishlistItemAdded,
  wishlistItemRemoved,
  updateWishlist,
} from "../wishlist/wishlistSlice";
import { useDispatch, useSelector } from "react-redux";
import DeleteIcon from "@material-ui/icons/Delete";

function WishlistButton({ product, deleteIcon }) {
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.wishlist.wishlistItems);
  const handleAddToWishlist = () => {
    dispatch(wishlistItemAdded(product));
    dispatch(updateWishlist());
  };
  const handleRemoveFromWishlist = () => {
    dispatch(wishlistItemRemoved(product));
    dispatch(updateWishlist());
  };

  return wishlist.some((element) => element._id === product._id) ? (
    <IconButton
      data-testid="remove-from-wishlist-button"
      onClick={handleRemoveFromWishlist}
    >
      {deleteIcon ? (
        <DeleteIcon color="disabled" />
      ) : (
        <FavoriteIcon color="secondary" />
      )}
    </IconButton>
  ) : (
    <IconButton
      data-testid="add-to-wishlist-button"
      onClick={handleAddToWishlist}
    >
      <FavoriteBorderIcon color="disabled" />
    </IconButton>
  );
}

export default WishlistButton;

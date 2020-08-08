import React from "react";
import { IconButton } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import {
  productAdded,
  updateCart,
  selectCartContents,
} from "../cart/cartSlice";
import { isStockAvailable } from "../products/productsSlice";

import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";

function AddToCartButton({ product }) {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    if (isStockAvailable(cartProducts, product)) {
      dispatch(productAdded({ ...product, quantity: 1 }));
      dispatch(updateCart());
    }
  };

  const cartProducts = useSelector(selectCartContents);
  return (
    <IconButton
      onClick={handleAddToCart}
      disabled={!isStockAvailable(cartProducts, product)}
    >
      <AddShoppingCartIcon />
    </IconButton>
  );
}

export default AddToCartButton;

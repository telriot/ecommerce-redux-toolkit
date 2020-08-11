import React from "react";
import { Button, IconButton } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import {
  productAdded,
  updateCart,
  selectCartContents,
} from "../cart/cartSlice";
import { isStockAvailable } from "../products/productsSlice";

import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";

function AddToCartButton({ product, format, quantity, size }) {
  const dispatch = useDispatch();
  const handleAddToCart = () => {
    if (isStockAvailable(cartProducts, product)) {
      dispatch(productAdded({ ...product, quantity: parseInt(quantity) || 1 }));
      dispatch(updateCart());
    }
  };
  const cartProducts = useSelector(selectCartContents);
  const ButtonVariant = ({ format }) => {
    switch (format) {
      case "icon":
        return (
          <IconButton
            onClick={handleAddToCart}
            disabled={!isStockAvailable(cartProducts, product)}
          >
            <AddShoppingCartIcon />
          </IconButton>
        );
      case "button":
        return (
          <Button
            onClick={handleAddToCart}
            disabled={!isStockAvailable(cartProducts, product)}
            size={size || "normal"}
          >
            Add to cart{" "}
          </Button>
        );
      default:
        return null;
    }
  };

  return <ButtonVariant format={format} />;
}

export default AddToCartButton;

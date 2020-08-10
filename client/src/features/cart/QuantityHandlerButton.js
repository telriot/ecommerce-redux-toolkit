import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { IconButton, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import { isStockAvailable } from "../products/productsSlice";
import {
  productAdded,
  productRemoved,
  updateCart,
  selectCartContents,
} from "./cartSlice";

const useStyles = makeStyles((theme) => ({
  itemsInCartDiv: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
  },
}));

function QuantityHandlerButton({ product }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { itemsInCart } = product;
  const cartProducts = useSelector(selectCartContents);
  const handleAddBtnClick = () => {
    if (isStockAvailable(cartProducts, product)) {
      dispatch(productAdded({ ...product, quantity: 1 }));
      dispatch(updateCart());
    }
  };
  const handleRemoveBtnClick = () => {
    dispatch(productRemoved({ ...product, quantity: 1 }));
    dispatch(updateCart());
  };

  return (
    <div className={classes.itemsInCartDiv}>
      <IconButton
        disabled={!isStockAvailable(cartProducts, product)}
        onClick={handleAddBtnClick}
        aria-label="increase"
        size="small"
      >
        <AddIcon fontSize="small" />
      </IconButton>
      <Typography aria-label="items-in-cart" variant="body2">
        {itemsInCart}
      </Typography>
      <IconButton
        onClick={handleRemoveBtnClick}
        aria-label="decrease"
        size="small"
      >
        <RemoveIcon fontSize="small" />
      </IconButton>
    </div>
  );
}

export default QuantityHandlerButton;

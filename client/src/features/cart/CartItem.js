import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, IconButton, Card, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import { isStockAvailable } from "../products/productsSlice";
import {
  productAdded,
  productDeleted,
  productRemoved,
  updateCart,
  selectCartContents,
} from "./cartSlice";

const useStyles = makeStyles((theme) => ({
  card: {
    display: "flex",
    justifyContent: "space-between",
    padding: theme.spacing(1),
    margin: theme.spacing(2),
    height: "8rem",
  },
  product: {},
  itemsInCartDiv: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
  },
}));

function CartItem({ product }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { name, brand, itemsInCart, price } = product;
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
  const handleDeleteBtnClick = () => {
    dispatch(productDeleted(product));
    dispatch(updateCart());
  };

  return (
    <Card className={classes.card}>
      <div className={classes.product}>
        <Typography variant="h6">{name}</Typography>
        <Typography variant="subtitle1">{brand}</Typography>
        <Typography variant="body1">{price}</Typography>
        <Button color="secondary" onClick={handleDeleteBtnClick}>
          Remove from cart
        </Button>
      </div>
      <div className={classes.itemsInCartDiv}>
        <IconButton
          disabled={!isStockAvailable(cartProducts, product)}
          onClick={handleAddBtnClick}
          aria-label="increase"
        >
          <AddIcon />
        </IconButton>
        <Typography aria-label="items-in-cart" variant="body1">
          {itemsInCart}
        </Typography>
        <IconButton onClick={handleRemoveBtnClick} aria-label="decrease">
          <RemoveIcon />
        </IconButton>
      </div>
    </Card>
  );
}

export default CartItem;

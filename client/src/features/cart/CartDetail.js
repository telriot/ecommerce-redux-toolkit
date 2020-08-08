import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  selectCartContents,
  selectCartItemTotal,
  selectCartShippingCost,
  selectTaxPercent,
  productsReset,
  updateCart,
} from "./cartSlice";
import { Button, Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { selectAuthorizedUser, openedAuthDialog } from "../auth/authSlice";

import CartItem from "./CartItem";
import { resetCheckoutSteps } from "../checkout/checkoutSlice";

const useStyles = makeStyles((theme) => ({
  grid: {
    margin: "2rem 0",
  },
  subGridLeft: {},
  subGridRight: {},
}));
function CartDetail() {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartContents);
  const itemTotal = useSelector(selectCartItemTotal);
  const shipping = useSelector(selectCartShippingCost);
  const taxPercent = useSelector(selectTaxPercent);
  const taxes = (itemTotal / 100) * taxPercent;
  const total = itemTotal + shipping + taxes;
  const authUser = useSelector(selectAuthorizedUser);

  const handleCheckoutClick = () => {
    dispatch(resetCheckoutSteps());
    if (total && authUser._id) {
      history.push("/checkout");
    } else if (total && !authUser._id) {
      dispatch(openedAuthDialog());
    }
  };
  const handleCartReset = () => {
    dispatch(productsReset());
    dispatch(updateCart());
  };

  return (
    <Grid
      className={classes.grid}
      data-testid="component-cart-detail"
      container
    >
      <Grid className={classes.subGridLeft} item={true} xs={12} sm={8}>
        {Object.keys(cartItems).length
          ? Object.values(cartItems).map((item) => (
              <CartItem key={item._id} product={item} />
            ))
          : "Your cart is empty"}
      </Grid>
      <Grid className={classes.subGridRight} item={true} sm={4}>
        <Typography variant="h6">Your Order</Typography>
        <Typography variant="body1">Items: ${itemTotal}</Typography>
        <Typography variant="body1">Shipping: ${shipping}</Typography>
        <Typography variant="body1">Taxes: ${taxes}</Typography>
        <Typography variant="body1">Total: ${total}</Typography>
        <Button
          disabled={!total}
          variant="contained"
          color="primary"
          onClick={handleCheckoutClick}
        >
          Checkout
        </Button>
        <Button variant="contained" color="secondary" onClick={handleCartReset}>
          Reset
        </Button>
      </Grid>
    </Grid>
  );
}

export default CartDetail;

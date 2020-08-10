import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  selectCartItemTotal,
  selectCartShippingCost,
  selectTaxPercent,
  productsReset,
  updateCart,
} from "./cartSlice";
import { Button, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { selectAuthorizedUser, openedAuthDialog } from "../auth/authSlice";
import { resetCheckoutSteps } from "../checkout/checkoutSlice";

const useStyles = makeStyles((theme) => ({
  subtotalDiv: {
    display: "flex",
    marginBottom: theme.spacing(1),
    "& h6": {
      fontWeight: 400,
      paddingRight: theme.spacing(1),
    },
  },
  buttonDiv: {
    display: "flex",
    flexDirection: "column",
  },
  checkoutButton: {
    marginBottom: theme.spacing(1),
  },
}));
function CartRecap() {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
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
    <>
      <div className={classes.subtotalDiv}>
        <Typography variant="h6">Your Subtotal: </Typography>
        <Typography variant="h6" component="p">
          ${itemTotal}
        </Typography>
      </div>
      <div className={classes.buttonDiv}>
        <Button
          disabled={!total}
          variant="contained"
          color="primary"
          onClick={handleCheckoutClick}
          classes={{ root: classes.checkoutButton }}
        >
          Proceed to checkout
        </Button>
        <Button size="small" color="secondary" onClick={handleCartReset}>
          Remove all items
        </Button>
      </div>
    </>
  );
}

export default CartRecap;

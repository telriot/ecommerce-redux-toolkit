import React from "react";
import { useSelector } from "react-redux";
import { selectCartItemCount } from "./cartSlice";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { Badge } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  cartIconDiv: {
    marginRight: "1rem",
  },
}));
function CartIcon() {
  const classes = useStyles();

  const count = useSelector(selectCartItemCount);
  return (
    <Link to="/cart">
      <div className={classes.cartIconDiv}>
        <Badge data-testid="cart-badge" badgeContent={count} color="secondary">
          <ShoppingCartIcon fontSize="default" />
        </Badge>
      </div>
    </Link>
  );
}

export default CartIcon;

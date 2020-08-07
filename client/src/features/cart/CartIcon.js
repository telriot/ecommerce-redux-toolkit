import React from "react";
import { useSelector } from "react-redux";
import { selectCartItemCount } from "./cartSlice";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
const useStyles = makeStyles((theme) => ({
  cartIconDiv: {
    position: "relative",
    marginRight: "1rem",
  },
  counterDiv: {
    position: "absolute",
    top: "-4px",
    right: "-4px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "100px",
    width: ".875rem",
    height: ".875rem",
    background: theme.palette.secondary.main,
    fontSize: ".625rem",
    color: "#fff",
  },
}));
function CartIcon() {
  const classes = useStyles();

  const count = useSelector(selectCartItemCount);
  const handleCartClick = () => {};
  return (
    <Link to="/cart">
      <div className={classes.cartIconDiv}>
        <ShoppingCartIcon onClick={handleCartClick} fontSize="normal" />
        <div className={classes.counterDiv}>{count}</div>
      </div>
    </Link>
  );
}

export default CartIcon;

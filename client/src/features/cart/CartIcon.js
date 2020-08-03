import React from "react";
import { useSelector } from "react-redux";
import { selectCartItemCount } from "./cartSlice";
import { Link } from "react-router-dom";

function CartIcon() {
  const count = useSelector(selectCartItemCount);
  const handleCartClick = () => {};
  return (
    <Link to="/cart">
      <div onClick={handleCartClick}>Items in Cart: {count}</div>
    </Link>
  );
}

export default CartIcon;

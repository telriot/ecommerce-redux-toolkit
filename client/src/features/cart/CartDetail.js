import React from "react";
import { useSelector } from "react-redux";
import { selectCartContents, selectCartTotal } from "./cartSlice";
import CartItem from "./CartItem";
function CartDetail() {
  const contents = useSelector(selectCartContents);
  const total = useSelector(selectCartTotal);
  console.log(contents);
  return (
    <div>
      {Object.values(contents).map((item) => (
        <CartItem key={item._id} product={item} />
      ))}
    </div>
  );
}

export default CartDetail;

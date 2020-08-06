import React from "react";
import { Button, Card, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { productAdded, updateCart } from "../cart/cartSlice";
import { selectAuthorizedUser } from "../auth/authSlice";
import WishlistButton from "./WishlistButton";

const useStyles = makeStyles((theme) => ({
  card: {
    padding: theme.spacing(1),
    margin: theme.spacing(2),
    height: "16rem",
  },
}));

function ProductCard({ product }) {
  const { name, brand, description, quantity, price } = product;
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = useSelector(selectAuthorizedUser);
  const maxLength = 80;
  const handleAddToCart = () => {
    dispatch(productAdded({ ...product, quantity: 1 }));
    dispatch(updateCart());
  };

  return (
    <Card className={classes.card}>
      <Typography variant="h6">{name}</Typography>
      <Typography variant="subtitle1">{brand}</Typography>
      <br />
      <Typography variant="body1">{`${
        description.length > maxLength
          ? description.slice(0, maxLength).trim() + "..."
          : description
      }`}</Typography>
      <br />
      <Typography variant="body1">{price}</Typography>
      <Typography variant="caption">
        {quantity ? "In stock: " + quantity : "Out of stock"}
      </Typography>
      <br />
      <Button onClick={handleAddToCart} variant="contained">
        Add to cart
      </Button>
      {user._id !== null && <WishlistButton product={product} />}
    </Card>
  );
}

export default ProductCard;

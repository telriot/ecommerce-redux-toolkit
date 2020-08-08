import React from "react";
import { Button, Card, Typography, CardMedia } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import {
  productAdded,
  updateCart,
  selectCartContents,
} from "../cart/cartSlice";
import { selectAuthorizedUser } from "../auth/authSlice";
import { isStockAvailable } from "../products/productsSlice";
import WishlistButton from "./WishlistButton";

const useStyles = makeStyles((theme) => ({
  card: {
    padding: theme.spacing(1),
    margin: theme.spacing(2),
    height: "24rem",
  },
  media: {
    margin: theme.spacing(1),
    height: 150,
    width: 150,
  },
}));

function ProductCard({ product }) {
  const { name, brand, description, quantity, price } = product;
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = useSelector(selectAuthorizedUser);
  const cartProducts = useSelector(selectCartContents);
  const maxLength = 80;

  const handleAddToCart = () => {
    if (isStockAvailable(cartProducts, product)) {
      dispatch(productAdded({ ...product, quantity: 1 }));
      dispatch(updateCart());
    }
  };
  console.log(product.image);

  return (
    <Card className={classes.card}>
      <Typography variant="h6">{name}</Typography>
      <Typography variant="subtitle1">{brand}</Typography>
      <br />
      <CardMedia className={classes.media} image={product.image} />
      <Typography variant="body2">{`${
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
      <Button
        onClick={handleAddToCart}
        disabled={!isStockAvailable(cartProducts, product)}
        variant="contained"
      >
        Add to cart
      </Button>
      {user._id !== null && <WishlistButton product={product} />}
    </Card>
  );
}

export default ProductCard;

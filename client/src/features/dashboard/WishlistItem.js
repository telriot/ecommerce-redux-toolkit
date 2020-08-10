import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, CardMedia, Card, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { productAdded, updateCart } from "../cart/cartSlice";
import {
  wishlistItemRemoved,
  updateWishlist,
} from "../dashboard/dashboardSlice";
const useStyles = makeStyles((theme) => ({
  card: {
    margin: theme.spacing(2, 0),
    display: "flex",
  },
  media: {
    width: 150,
  },
  infoDiv: {
    display: "flex",
    flexDirection: "column",
  },
  textElements: {
    display: "flex",
    flexDirection: "column",
    paddingLeft: theme.spacing(0.75),
    marginBottom: theme.spacing(2),
  },
  buttonDiv: {
    display: "flex",
  },
  deleteButton: {
    alignSelf: "flex-start",
  },
  product: {
    display: "flex",
    flex: 1,
    justifyContent: "space-between",
    padding: theme.spacing(2),
  },
}));
function WishlistItem({ product, index }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user._id);
  const { name, brand, price, image } = product;
  const handleRemoveFromWishlist = () => {
    dispatch(wishlistItemRemoved(product));
    dispatch(updateCart());
  };
  const handleMoveToCart = () => {
    dispatch(wishlistItemRemoved(product));
    dispatch(updateWishlist());
    dispatch(productAdded({ ...product, quantity: 1 }));
    dispatch(updateCart());
  };
  return (
    <Card className={classes.card} data-testid="wishlist-item">
      <CardMedia className={classes.media} image={image} />
      <div className={classes.product}>
        <div className={classes.infoDiv}>
          <div className={classes.textElements}>
            <Typography variant="h6">{name}</Typography>
            <Typography variant="caption">{brand}</Typography>
          </div>

          <div className={classes.buttonDiv}>
            <Button
              color="secondary"
              classes={{ root: classes.deleteButton }}
              onClick={handleRemoveFromWishlist}
              size="small"
            >
              Remove
            </Button>
            {user && (
              <Button
                classes={{ root: classes.deleteButton }}
                onClick={handleMoveToCart}
                size="small"
              >
                Add to Cart
              </Button>
            )}
          </div>
        </div>
        <Typography variant="h6" component="p">
          ${price}
        </Typography>
      </div>
    </Card>
  );
}

export default WishlistItem;

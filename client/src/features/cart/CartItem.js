import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, CardMedia, Card, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import QuantityHandlerButton from "./QuantityHandlerButton";
import { productDeleted, updateCart } from "./cartSlice";
import { wishlistItemAdded, updateWishlist } from "../dashboard/dashboardSlice";

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

function CartItem({ product }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user._id);
  const { name, brand, price } = product;

  const handleDeleteBtnClick = () => {
    dispatch(productDeleted(product));
    dispatch(updateCart());
  };
  const handleMoveToWishlist = () => {
    dispatch(wishlistItemAdded(product));
    dispatch(updateWishlist());
    dispatch(productDeleted(product));
    dispatch(updateCart());
  };

  return (
    <Card className={classes.card}>
      <CardMedia className={classes.media} image={product.image} />
      <div className={classes.product}>
        <div className={classes.infoDiv}>
          <div className={classes.textElements}>
            <Typography variant="h6">{name}</Typography>
            <Typography variant="caption">{brand}</Typography>
          </div>

          <div className={classes.buttonDiv}>
            <QuantityHandlerButton product={product} />
            <Button
              color="secondary"
              classes={{ root: classes.deleteButton }}
              onClick={handleDeleteBtnClick}
              size="small"
            >
              Remove
            </Button>
            {user && (
              <Button
                classes={{ root: classes.deleteButton }}
                onClick={handleMoveToWishlist}
                size="small"
              >
                Add to Wishlist
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

export default CartItem;

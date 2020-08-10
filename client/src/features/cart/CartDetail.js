import React from "react";
import { useSelector } from "react-redux";
import { selectCartContents, selectCartItemTotal } from "./cartSlice";
import { Container, Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CartItem from "./CartItem";
import CartRecap from "./CartRecap";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    padding: theme.spacing(4),
  },
  grid: {
    margin: "2rem 0",
  },
  header: { marginBottom: theme.spacing(4) },
  subGridLeft: {},
  subGridRight: {
    padding: theme.spacing(0, 4),
  },
}));
function CartDetail() {
  const classes = useStyles();
  const cartItems = useSelector(selectCartContents);

  return (
    <Container className={classes.container}>
      <Grid
        className={classes.grid}
        data-testid="component-cart-detail"
        container
      >
        <Grid className={classes.subGridLeft} item={true} xs={12} sm={9}>
          <Typography className={classes.header} variant="h6">
            Shopping Cart
          </Typography>
          {Object.keys(cartItems).length ? (
            Object.values(cartItems).map((item) => (
              <CartItem key={item._id} product={item} />
            ))
          ) : (
            <Typography variant="h6">Your shopping cart is empty</Typography>
          )}
        </Grid>
        <Grid className={classes.subGridRight} item={true} sm={3}>
          <CartRecap />
        </Grid>
      </Grid>
    </Container>
  );
}

export default CartDetail;

import React from "react";
import { useSelector } from "react-redux";
import {
  selectCheckoutTransactionDetails,
  selectShippingAddress,
} from "./checkoutSlice";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  listItem: {
    padding: theme.spacing(1, 0),
  },
  total: {
    fontWeight: 700,
  },
  title: {
    marginTop: theme.spacing(2),
  },
  shippingDiv: { marginBottom: theme.spacing(2) },
}));

export default function Review({ handleNext }) {
  const classes = useStyles();
  const { products, total } = useSelector(selectCheckoutTransactionDetails);
  const {
    firstName,
    lastName,
    street,
    postcode,
    city,
    state,
    country,
  } = useSelector(selectShippingAddress);
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Order confirmed
      </Typography>
      <List disablePadding>
        {products &&
          Object.values(products).map((product) => (
            <ListItem className={classes.listItem} key={product.name}>
              <ListItemText
                primary={`${product.itemsInCart} ${product.name}`}
                secondary={product.description}
              />
              <Typography variant="body2">{`${
                product.itemsInCart * parseFloat(product.price).toFixed(2)
              }$`}</Typography>
            </ListItem>
          ))}
        <ListItem className={classes.listItem}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" className={classes.total}>
            {total}$
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
        <Grid className={classes.shippingDiv} item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Shipping to:
          </Typography>
          <Typography
            variant="body2"
            gutterBottom
          >{`${firstName} ${lastName}`}</Typography>
          <Typography className={classes.text} variant="body2">
            {street}
          </Typography>
          <Typography
            className={classes.text}
            variant="body2"
          >{`${postcode} ${city}`}</Typography>
          <Typography
            className={classes.text}
            variant="body2"
          >{`${state} ${country}`}</Typography>
        </Grid>
        {/* <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Payment details
            </Typography>
        </Grid>*/}
      </Grid>
      <div>
        <Button
          variant="contained"
          color="primary"
          onClick={handleNext}
          className={classes.button}
        >
          Back to Main Page
        </Button>
      </div>
    </React.Fragment>
  );
}

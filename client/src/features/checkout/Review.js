import React from "react";
import { useSelector } from "react-redux";
import { selectBillingInfo } from "../dashboard/dashboardSlice";
import { selectCheckoutTransactionDetails } from "./checkoutSlice";
import { makeStyles } from "@material-ui/core/styles";
import {
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
}));

export default function Review() {
  const classes = useStyles();
  const { products, total } = useSelector(selectCheckoutTransactionDetails);
  const billingInfo = useSelector(selectBillingInfo);
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
                product.itemsInCart *
                parseFloat(product.price.slice(1, -1)).toFixed(2)
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
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Shipping
          </Typography>
          <Typography
            gutterBottom
          >{`${billingInfo.firstName} ${billingInfo.lastName}`}</Typography>
          <Typography gutterBottom>{billingInfo.address}</Typography>
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Payment details
          </Typography>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

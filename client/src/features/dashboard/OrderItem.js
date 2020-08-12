import React from "react";
import { Card, CardHeader, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import OrderItemIndividualProduct from "./OrderItemIndividualProduct";
const useStyles = makeStyles((theme) => ({
  card: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },
  cardHeader: {
    display: "flex",
    padding: theme.spacing(1, 2),
    justifyContent: "space-between",
    background: theme.palette.grey[200],
  },
  headerLeft: {
    display: "flex",
    "& > *": {
      marginRight: theme.spacing(2),
    },
  },
  headerRight: {
    textAlign: "end",
  },
  headerTextBlock: {
    display: "flex",
    flexDirection: "column",
    "& > *": {
      fontSize: theme.typography.caption.fontSize,
    },
  },
}));
function OrderItem({ order, index }) {
  const [isOpen, setIsOpen] = React.useState(false);
  const classes = useStyles();
  const date = new Date(order.date);
  const parsedDate = date.toLocaleString().split(",")[0];
  const parsedProducts = Object.values(order.products).map(
    (product, index) => product
  );

  return (
    <Card className={classes.card}>
      <div className={classes.cardHeader}>
        <div className={classes.headerLeft}>
          <div className={classes.headerTextBlock}>
            <Typography variant="button">Order placed</Typography>
            <Typography variant="subtitle1">{parsedDate}</Typography>
          </div>
          <div className={classes.headerTextBlock}>
            <Typography variant="button">Total</Typography>
            <Typography variant="subtitle1">${order.total}</Typography>
          </div>
          <div className={classes.headerTextBlock}>
            <Typography variant="button">Ship to</Typography>
            <Typography variant="subtitle1">hardcoded value</Typography>
          </div>
        </div>
        <div className={classes.headerRight}>
          <div className={classes.headerTextBlock}>
            <Typography variant="button">Order Id</Typography>
            <Typography variant="subtitle1">{order._id}</Typography>
          </div>
        </div>
      </div>
      {parsedProducts.map((product, index) => (
        <OrderItemIndividualProduct
          product={product}
          key={product._id}
          index={index}
        />
      ))}
    </Card>
  );
}

export default OrderItem;

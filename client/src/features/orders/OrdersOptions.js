import React from "react";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Paper, Typography, Divider } from "@material-ui/core";
import OrdersTextFilter from "./OrdersTextFilter";
import OrdersSelect from "./OrdersSelect";
const useStyles = makeStyles((theme) => ({
  paper: {
    display: "flex",
    flexDirection: "column",
    padding: theme.spacing(2),
    width: "16rem",
  },
}));
const periodOptions = [
  { value: "", display: "Any time" },
  { value: "1mo", display: "This month" },
  { value: "1mo", display: "This year" },
  { value: "2019", display: "2019" },
];
const statusOptions = [
  { value: "", display: "Any status" },
  { value: "delivered", display: "Delivered" },
  { value: "shipped", display: "Shipped" },
  { value: "processing", display: "Processing" },
  { value: "cancelled", display: "Cancelled" },
];
function OrdersOptions({ maxItems }) {
  const classes = useStyles();
  const recentViews = useSelector((state) => state.recentViews.recentViews);

  return (
    <Paper className={classes.paper}>
      {" "}
      <Typography className={classes.title}>Browse your orders</Typography>
      <OrdersTextFilter />
      <OrdersSelect options={periodOptions} label="Period" />
      <OrdersSelect options={statusOptions} label="Status" />
      <Button>Search</Button>
    </Paper>
  );
}

export default OrdersOptions;

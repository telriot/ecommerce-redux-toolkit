import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Paper, Typography, Divider } from "@material-ui/core";
import OrdersTextFilter from "./OrdersTextFilter";
import OrdersSelect from "./OrdersSelect";
import { ordersStatusFilterSet, ordersTimeFilterSet } from "./ordersSlice";
const useStyles = makeStyles((theme) => ({
  paper: {
    display: "flex",
    flexDirection: "column",
    padding: theme.spacing(2),
    width: "16rem",
  },
}));
const timeOptions = [
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
  const dispatch = useDispatch();
  const timeSearchSelection = useSelector(
    (state) => state.orders.ordersTimeFilter
  );
  const statusSearchSelection = useSelector(
    (state) => state.orders.ordersStatusFilter
  );

  const handleChangeTime = (e) => {
    dispatch(ordersTimeFilterSet(e.target.value));
  };
  const handleChangeStatus = (e) => {
    dispatch(ordersStatusFilterSet(e.target.value));
  };
  return (
    <Paper className={classes.paper}>
      {" "}
      <Typography className={classes.title}>Browse your orders</Typography>
      <OrdersTextFilter />
      <OrdersSelect
        value={timeSearchSelection}
        onChange={handleChangeTime}
        options={timeOptions}
        label="Period"
      />
      <OrdersSelect
        value={statusSearchSelection}
        onChange={handleChangeStatus}
        options={statusOptions}
        label="Status"
      />
      <Button>Search</Button>
    </Paper>
  );
}

export default OrdersOptions;

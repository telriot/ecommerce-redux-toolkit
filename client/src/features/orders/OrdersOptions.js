import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Paper, Typography } from "@material-ui/core";
import OrdersTextFilter from "./OrdersTextFilter";
import OrdersSelect from "./OrdersSelect";
import {
  ordersStatusFilterSet,
  ordersTimeFilterSet,
  fetchOrders,
  pageChanged,
} from "./ordersSlice";
const useStyles = makeStyles((theme) => ({
  paper: {
    display: "flex",
    flexDirection: "column",
    padding: theme.spacing(2),
    minWidth: "16rem",
  },
}));
const timeOptions = [
  { value: 0, display: "Any time" },
  {
    value: 1,
    display: "This month",
  },
  {
    value: 2,
    display: "This year",
  },
  {
    value: 3,
    display: "2020",
  },
  {
    value: 4,
    display: "2019",
  },
];
const statusOptions = [
  { value: "", display: "Any status" },
  { value: "delivered", display: "Delivered" },
  { value: "shipped", display: "Shipped" },
  { value: "processing", display: "Processing" },
  { value: "canceled", display: "Canceled" },
];
function OrdersOptions() {
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
  const handleClickSearch = () => {
    dispatch(pageChanged(1));
    dispatch(fetchOrders());
  };
  return (
    <Paper className={classes.paper}>
      {" "}
      <Typography className={classes.title}>Browse your orders</Typography>
      <OrdersTextFilter />
      <OrdersSelect
        testid="period-select"
        value={timeSearchSelection}
        onChange={handleChangeTime}
        options={timeOptions}
        label="Period"
      />
      <OrdersSelect
        testid="status-select"
        value={statusSearchSelection}
        onChange={handleChangeStatus}
        options={statusOptions}
        label="Status"
      />
      <Button onClick={handleClickSearch}>Search</Button>
    </Paper>
  );
}

export default OrdersOptions;

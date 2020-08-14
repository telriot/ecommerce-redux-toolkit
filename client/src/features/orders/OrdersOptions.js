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
  { value: "", display: "Any time" },
  {
    value: {
      start: new Date(Date.now() - 2629800000),
      end: new Date(Date.now() + 3600),
    },
    display: "This month",
  },
  {
    value: {
      start: new Date(Date.now() - 31557600000),
      end: new Date(Date.now() + 3600),
    },
    display: "This year",
  },
  {
    value: {
      start: new Date("2020-01-01"),
      end: new Date("2020-12-31T23:59:59"),
    },
    display: "2020",
  },
  {
    value: {
      start: new Date("2019-01-01"),
      end: new Date("2019-12-31T23:59:59"),
    },
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
      <Button onClick={handleClickSearch}>Search</Button>
    </Paper>
  );
}

export default OrdersOptions;

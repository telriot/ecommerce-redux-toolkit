import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Grid, Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { fetchOrders, selectDashboardStatus } from "./dashboardSlice";
import OrderItem from "./OrderItem";
import CustomPagination from "../shared/CustomPagination";
import { pageChanged } from "../dashboard/dashboardSlice";
import RecentlyViewed from "../shared/RecentlyViewed";

const useStyles = makeStyles((theme) => ({
  grid: {},
  paper: { padding: theme.spacing(3) },
}));

function MyOrders() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.dashboard.orders);
  const isFetching = useSelector(selectDashboardStatus);
  const page = useSelector((state) => state.dashboard.ordersPage);
  const totalPages = useSelector((state) => state.dashboard.ordersTotalPages);
  const ordersPerPage = useSelector((state) => state.dashboard.ordersPerPage);
  const [ordersToRender, setOrdersToRender] = React.useState([]);

  const handleChange = (e, page) => {
    dispatch(pageChanged(page));
  };
  React.useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);
  React.useEffect(() => {
    const paginateOrders = (orders) =>
      orders
        .filter(
          (order, index) =>
            index < page * ordersPerPage &&
            index >= page * ordersPerPage - ordersPerPage
        )
        .map((order, index) => (
          <OrderItem key={`order-${order._id}`} order={order} index={index} />
        ));
    setOrdersToRender(paginateOrders(orders));
  }, [orders, page, ordersPerPage]);
  return (
    <Grid container data-testid="my-orders-component">
      <Grid item xs={9}>
        <Typography variant="h5">Order history</Typography>
        <Typography variant="subtitle1">
          Dolor anim minim anim proident occaecat nulla do.
        </Typography>
        <Paper className={classes.paper}>
          {isFetching === "pending" ? "Loading..." : ordersToRender}
        </Paper>
      </Grid>
      <Grid item xs={3}>
        <RecentlyViewed />
      </Grid>
      <CustomPagination
        totalPages={totalPages}
        currentPage={page}
        handleChange={handleChange}
      />
    </Grid>
  );
}

export default MyOrders;

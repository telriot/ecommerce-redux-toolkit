import React from "react";
import { Link } from "react-router-dom";
import MuiLink from "@material-ui/core/Link";
import { useSelector, useDispatch } from "react-redux";
import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { selectDashboardStatus } from "../dashboard/dashboardSlice";
import OrderItem from "./OrderItem";
import CustomPagination from "../shared/CustomPagination";
import { pageChanged, fetchOrders } from "./ordersSlice";
import OrdersOptions from "./OrdersOptions";
const useStyles = makeStyles((theme) => ({
  title: { marginBottom: theme.spacing(2) },
  subGridRight: {
    paddingLeft: theme.spacing(4),
  },
}));

function MyOrders() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders.orders);
  const isFetching = useSelector(selectDashboardStatus);
  const page = useSelector((state) => state.orders.ordersPage);
  const totalPages = useSelector((state) => state.orders.ordersTotalPages);
  const ordersHistory = useSelector((state) => state.auth.user.orders);
  const handleChange = (e, page) => {
    dispatch(pageChanged(page));
    dispatch(fetchOrders());
  };
  React.useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  return (
    <Grid container data-testid="my-orders-component">
      <Grid item xs={8}>
        <Typography className={classes.title} variant="h5">
          Order history
        </Typography>
        {isFetching === "pending" ? (
          "Loading..."
        ) : orders.length ? (
          orders.map((order, index) => (
            <OrderItem key={`order-${order._id}`} order={order} index={index} />
          ))
        ) : !ordersHistory.length ? (
          <Typography variant="subtitle1">
            No orders yet. Try finding something you like{" "}
            <Link to="/">
              <MuiLink>here</MuiLink>
            </Link>
            .
          </Typography>
        ) : (
          <Typography variant="subtitle1">
            There are no orders matching your search.
          </Typography>
        )}
      </Grid>
      <Grid className={classes.subGridRight} item xs={4}>
        {" "}
        <OrdersOptions />
      </Grid>
      {totalPages > 1 && (
        <CustomPagination
          totalPages={totalPages}
          currentPage={page}
          handleChange={handleChange}
        />
      )}
    </Grid>
  );
}

export default MyOrders;

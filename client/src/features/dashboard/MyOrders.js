import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Grid, Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { fetchOrders, selectDashboardStatus } from "./dashboardSlice";
import OrderItem from "./OrderItem";
const useStyles = makeStyles((theme) => ({
  grid: {},
  paper: { padding: theme.spacing(3) },
}));
function MyOrders() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.dashboard.orders);
  const isFetching = useSelector(selectDashboardStatus);

  React.useEffect(() => {
    dispatch(fetchOrders());
  }, []);
  return (
    <Grid container>
      <Grid item xs={9}>
        <Typography variant="h5">Order history</Typography>
        <Typography variant="subtitle1">
          Dolor anim minim anim proident occaecat nulla do.
        </Typography>
        <Paper className={classes.paper}>
          {isFetching === "pending"
            ? "Loading..."
            : orders.map((order, index) => (
                <OrderItem key={`order${index}`} order={order} index={index} />
              ))}
        </Paper>
      </Grid>
      <Grid item xs={3}>
        Right
      </Grid>
    </Grid>
  );
}

export default MyOrders;

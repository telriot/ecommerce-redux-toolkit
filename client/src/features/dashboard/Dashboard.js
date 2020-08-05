import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";

import { Breadcrumbs, Container, Grid, Link } from "@material-ui/core";
import MyOrders from "./MyOrders";
import MyProfile from "./MyProfile";
import { fetchUser } from "./dashboardSlice";
import { selectAuthorizedUser } from "../auth/authSlice";
const useStyles = makeStyles((theme) => ({
  grid: {},
  container: {
    display: "flex",
    flexDirection: "column",
    padding: theme.spacing(3),
  },
  breadcrumbs: {
    marginBottom: theme.spacing(4),
  },
}));

function Dashboard() {
  const classes = useStyles();
  const authUser = useSelector(selectAuthorizedUser);
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = React.useState("my-profile");
  const handleClick = (e) => {
    setActiveTab(e.target.name);
  };
  React.useEffect(() => {
    authUser._id && dispatch(fetchUser());
  }, [dispatch, authUser]);
  return (
    <Grid data-testid="component-dashboard" container className={classes.grid}>
      <Container className={classes.container}>
        <Breadcrumbs className={classes.breadcrumbs} aria-label="breadcrumb">
          <Link
            color="inherit"
            href="#0"
            name="my-profile"
            onClick={handleClick}
          >
            My Profile
          </Link>
          <Link
            color="inherit"
            href="#0"
            name="my-orders"
            onClick={handleClick}
          >
            My Orders
          </Link>
          <Link
            color="inherit"
            href="#0"
            name="something-else"
            onClick={handleClick}
          >
            Something else
          </Link>
        </Breadcrumbs>
        {activeTab === "my-profile" ? (
          <MyProfile />
        ) : activeTab === "my-orders" ? (
          <MyOrders />
        ) : null}
      </Container>
    </Grid>
  );
}

export default Dashboard;

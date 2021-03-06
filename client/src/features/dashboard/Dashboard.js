import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Breadcrumbs, Container, Grid, Link } from "@material-ui/core";
import MyOrders from "../orders/MyOrders";
import MyProfile from "./MyProfile";
import { fetchUser } from "./dashboardSlice";
import { selectAuthorizedUser } from "../auth/authSlice";
import Wishlist from "../wishlist/Wishlist";
const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    padding: theme.spacing(4),
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
    <Container className={classes.container}>
      <Grid
        data-testid="component-dashboard"
        container
        className={classes.grid}
      >
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
          <Link color="inherit" href="#0" name="wishlist" onClick={handleClick}>
            Wishlist
          </Link>
        </Breadcrumbs>
        {activeTab === "my-profile" ? (
          <MyProfile />
        ) : activeTab === "my-orders" ? (
          <MyOrders />
        ) : activeTab === "wishlist" ? (
          <Wishlist />
        ) : null}
      </Grid>
    </Container>
  );
}

export default Dashboard;

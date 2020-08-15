import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Paper, Typography } from "@material-ui/core";
import ShippingAddressCard from "../dashboard/ShippingAddressCard";
import { selectAddressList } from "../dashboard/dashboardSlice";
import { activeShippingAddressSet } from "./checkoutSlice";
const useStyles = makeStyles((theme) => ({
  container: { display: "flex", marginTop: theme.spacing(4) },
  paper: { padding: theme.spacing(0, 2) },
}));

function AlternativeAddressSelector() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const addressList = useSelector(selectAddressList);
  const handleSelectShippingAddress = (address) => () => {
    dispatch(activeShippingAddressSet(address));
  };

  return (
    <Grid container spacing={3} className={classes.container}>
      {addressList.map((address, index) => (
        <Grid item xs={12} sm={6} md={3}>
          <Paper className={classes.paper}>
            <ShippingAddressCard
              selector
              handleSelect={handleSelectShippingAddress(address)}
              key={`address-${index}`}
              address={address}
              index={index}
            />
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
}

export default AlternativeAddressSelector;

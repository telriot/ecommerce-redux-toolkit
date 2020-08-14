import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Divider, Paper, Typography } from "@material-ui/core";
import ShippingAddressCard from "./ShippingAddressCard";
const useStyles = makeStyles((theme) => ({
  paper: {
    display: "flex",
    flexDirection: "column",
    padding: theme.spacing(3),
    minWidth: "16rem",
  },
}));

function ShippingAddressList() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const addressList = useSelector((state) => state.dashboard.addressList);
  return (
    <Paper className={classes.paper}>
      {" "}
      <Typography className={classes.title} variant="h6">
        Your address list
      </Typography>
      {addressList.map((address, index) => (
        <>
          {index !== 0 && <Divider />}
          <ShippingAddressCard
            key={`address-${index}`}
            address={address}
            index={index}
          />
        </>
      ))}
    </Paper>
  );
}

export default ShippingAddressList;

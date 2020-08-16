import React from "react";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Divider, Paper, Typography } from "@material-ui/core";
import ShippingAddressCard from "./ShippingAddressCard";
import { selectAddressList } from "./dashboardSlice";
const useStyles = makeStyles((theme) => ({
  paper: {
    display: "flex",
    flexDirection: "column",
    padding: theme.spacing(3),
    minWidth: "16rem",
    maxHeight: "60vh",
    overflow: "auto",
  },
}));

function ShippingAddressList() {
  const classes = useStyles();
  const addressList = useSelector(selectAddressList);
  return (
    <Paper className={classes.paper}>
      {" "}
      <Typography className={classes.title} variant="h6">
        Your address list
      </Typography>
      {addressList.map((address, index) => (
        <React.Fragment key={`address-${index}`}>
          {index !== 0 && <Divider />}
          <ShippingAddressCard address={address} index={index} />
        </React.Fragment>
      ))}
    </Paper>
  );
}

export default ShippingAddressList;

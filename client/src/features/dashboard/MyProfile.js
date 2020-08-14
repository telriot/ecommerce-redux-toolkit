import React from "react";
import { Grid, Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import BillingInfoForm from "./BillingInfoForm";
import NewAddressCard from "./NewAddressCard";
import ShippingAddressList from "./ShippingAddressList";
const useStyles = makeStyles((theme) => ({
  grid: {},
  subGridRight: {
    paddingLeft: theme.spacing(4),
  },
  paper: { padding: theme.spacing(3), marginBottom: theme.spacing(3) },
}));
function MyProfile() {
  const classes = useStyles();

  return (
    <Grid container>
      <Grid item xs={8}>
        <Typography variant="h5">Billing Information</Typography>
        <Typography variant="subtitle1">
          Dolor anim minim anim proident occaecat nulla do.
        </Typography>
        <Paper className={classes.paper}>
          <BillingInfoForm />
        </Paper>
        <NewAddressCard />
      </Grid>
      <Grid item xs={4} className={classes.subGridRight}>
        <ShippingAddressList />
      </Grid>
    </Grid>
  );
}

export default MyProfile;

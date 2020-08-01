import React from "react";
import { Grid, Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import BillingInfo from "./BillingInfo";
const useStyles = makeStyles((theme) => ({
  grid: {},
  paper: { padding: theme.spacing(3) },
}));
function MyProfile() {
  const classes = useStyles();

  return (
    <Grid container>
      <Grid item xs={9}>
        <Typography variant="h5">Billing Information</Typography>
        <Typography variant="subtitle1">
          Dolor anim minim anim proident occaecat nulla do.
        </Typography>
        <Paper className={classes.paper}>
          <BillingInfo />
        </Paper>
      </Grid>
      <Grid item xs={3}>
        Right
      </Grid>
    </Grid>
  );
}

export default MyProfile;

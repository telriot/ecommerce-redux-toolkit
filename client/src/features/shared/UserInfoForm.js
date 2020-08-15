import React from "react";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CustomTextField from "../shared/CustomTextField";
import CustomSelect from "../shared/CustomSelect";
import countries from "../../assets/countries.json";

const useStyles = makeStyles((theme) => ({}));

function BillingInfoForm({ disabled }) {
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <CustomTextField
            disabled={disabled}
            label="First Name"
            name="firstName"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <CustomTextField
            disabled={disabled}
            type="text"
            label="Last Name"
            name="lastName"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <CustomTextField
            disabled={disabled}
            name="email"
            type="email"
            label="Email"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <CustomTextField
            disabled={disabled}
            label="Phone Number"
            name="phone"
          />
        </Grid>
        <Grid item xs={12} sm={9}>
          <CustomTextField disabled={disabled} label="Street" name="street" />
        </Grid>
        <Grid item xs={12} sm={3}>
          <CustomTextField disabled={disabled} label="City" name="city" />
        </Grid>
        <Grid item xs={12} sm={5}>
          <CustomSelect
            disabled={disabled}
            name="country"
            label="Country"
            options={countries}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <CustomTextField disabled={disabled} name="state" label="State" />
        </Grid>
        <Grid item xs={12} sm={3}>
          <CustomTextField
            disabled={disabled}
            name="postcode"
            label="Postcode"
          />
        </Grid>
      </Grid>
    </>
  );
}

export default BillingInfoForm;

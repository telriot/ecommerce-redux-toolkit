import React from "react";
import { Formik, Form } from "formik";
import { Button, LinearProgress, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import CustomTextField from "../shared/CustomTextField";
import CustomSelect from "../shared/CustomSelect";
import countries from "../../assets/countries.json";
import { selectDashboardStatus, addNewAddress } from "./dashboardSlice";

import { profileSchema } from "../../validators";
const useStyles = makeStyles((theme) => ({
  formItems: {
    display: "flex",
    flexDirection: "column",
    marginBottom: theme.spacing(3),
  },
  buttonDiv: {
    display: "flex",
  },
  cancelButton: {
    marginRight: theme.spacing(2),
  },
}));

function BillingInfo() {
  const dashboardStatus = useSelector(selectDashboardStatus);
  const dispatch = useDispatch();
  const classes = useStyles();

  return dashboardStatus === "fulfilled" ? (
    <Formik
      initialValues={{
        firstName: "",
        lastName: "",
        street: "",
        city: "",
        country: "",
        state: "",
        postcode: "",
        phone: "",
      }}
      validationSchema={profileSchema}
      onSubmit={(values, { setSubmitting }) => {
        dispatch(addNewAddress(values));
        setSubmitting(false);
      }}
    >
      {({ values, submitForm, isSubmitting }) => (
        <Form aria-label="new-address-info-form">
          <div className={classes.formItems}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <CustomTextField label="First Name" name="firstName" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <CustomTextField
                  type="text"
                  label="Last Name"
                  name="lastName"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <CustomTextField name="email" type="email" label="Email" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <CustomTextField label="Phone Number" name="phone" />
              </Grid>
              <Grid item xs={12} sm={9}>
                <CustomTextField label="Street" name="street" />
              </Grid>
              <Grid item xs={12} sm={3}>
                <CustomTextField label="City" name="city" />
              </Grid>
              <Grid item xs={12} sm={5}>
                <CustomSelect
                  name="country"
                  label="Country"
                  options={countries}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <CustomTextField name="state" label="State" />
              </Grid>
              <Grid item xs={12} sm={3}>
                <CustomTextField name="postcode" label="Postcode" />
              </Grid>
            </Grid>
          </div>
          {isSubmitting && <LinearProgress />}
          <div>
            <>
              <Button
                classes={{ root: classes.cancelButton }}
                variant="contained"
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                color="secondary"
                disabled={isSubmitting}
                onClick={() => submitForm(values)}
              >
                Submit
              </Button>
            </>
          </div>
        </Form>
      )}
    </Formik>
  ) : (
    "Loading"
  );
}

export default BillingInfo;

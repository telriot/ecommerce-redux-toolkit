import React from "react";
import { useSelector } from "react-redux";
import {
  selectBillingInfo,
  selectDashboardStatus,
} from "../dashboard/dashboardSlice";
import { Typography, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Formik, Form } from "formik";
import { profileSchema } from "../../validators";
import CustomTextField from "../shared/CustomTextField";
import CustomSelect from "../shared/CustomSelect";
import countries from "../../assets/countries.json";
const useStyles = makeStyles((theme) => ({
  form: {
    display: "flex",
    flexDirection: "column",
    marginBottom: theme.spacing(3),
    width: "100%",
  },
}));
export default function AddressForm() {
  const classes = useStyles();
  const billingInfo = useSelector(selectBillingInfo);
  const { firstName, lastName, email, address, phone } = billingInfo;
  const dashboardStatus = useSelector(selectDashboardStatus);

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Shipping address
      </Typography>
      <Grid container>
        {dashboardStatus === "fulfilled" ? (
          <Formik
            initialValues={{
              firstName: firstName || "",
              lastName: lastName || "",
              email: email || "",
              address: address || "",
              phone: phone || "",
            }}
            validationSchema={profileSchema}
            onSubmit={(values, { setSubmitting }) => {
              setSubmitting(false);
            }}
          >
            {() => (
              <Form className={classes.form}>
                <CustomTextField label="First Name" name="firstName" />
                <CustomTextField
                  type="text"
                  label="Last Name"
                  name="lastName"
                />
                <CustomTextField label="Email" name="email" type="email" />
                <CustomTextField label="Postcode" name="street" />
                <CustomTextField label="City" name="city" />
                <CustomTextField label="Postcode" name="postcode" />
                <CustomSelect
                  name="country"
                  label="Country"
                  options={countries}
                />
                <CustomTextField name="state" label="State" />
                <CustomTextField name="phone" label="Phone Number" />
              </Form>
            )}
          </Formik>
        ) : (
          "Loading"
        )}
      </Grid>
    </>
  );
}

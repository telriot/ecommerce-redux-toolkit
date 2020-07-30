import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectBillingInfo,
  selectDashboardStatus,
} from "../dashboard/dashboardSlice";
import {
  Checkbox,
  FormControlLabel,
  Typography,
  Grid,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Formik, Form } from "formik";
import { profileSchema } from "../../validators";
import CustomTextField from "../shared/CustomTextField";
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
            {({ errors, touched, submitForm, isSubmitting }) => (
              <Form className={classes.form}>
                <CustomTextField label="First Name" name="firstName" />

                <CustomTextField
                  type="text"
                  label="Last Name"
                  name="lastName"
                />

                <CustomTextField name="email" type="email" label="Email" />

                <CustomTextField label="Address" name="address" />

                <CustomTextField label="Phone Number" name="phone" />

                <FormControlLabel
                  control={
                    <Checkbox
                      color="secondary"
                      name="saveAddress"
                      value="yes"
                    />
                  }
                  label="Use this address for payment details"
                />
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

import React from "react";
import { Formik, Form } from "formik";
import { Button, LinearProgress, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import {
  selectBillingInfo,
  selectDashboardStatus,
  updateUser,
} from "./dashboardSlice";
import CustomTextField from "../shared/CustomTextField";
import CustomSelect from "../shared/CustomSelect";
import countries from "../../assets/countries.json";

import { profileSchema } from "../../validators";
const useStyles = makeStyles((theme) => ({
  formItems: {
    display: "flex",
    flexDirection: "column",
    marginBottom: theme.spacing(3),
  },

  disabled: {
    color: "red",
  },
  buttonDiv: {
    display: "flex",
  },
  cancelButton: {
    marginRight: theme.spacing(2),
  },
}));

function BillingInfo() {
  const billingInfo = useSelector(selectBillingInfo);
  const dashboardStatus = useSelector(selectDashboardStatus);
  const dispatch = useDispatch();
  const {
    firstName,
    lastName,
    email,
    phone,
    street,
    country,
    state,
    postcode,
  } = billingInfo;
  const classes = useStyles();
  const [isEditing, setIsEditing] = React.useState(false);

  const toggleEdit = () => {
    setIsEditing((prevState) => !prevState);
  };
  return dashboardStatus === "fulfilled" ? (
    <Formik
      initialValues={{
        firstName: firstName || "",
        lastName: lastName || "",
        email: email || "",
        street: street || "",
        country: country || "",
        state: state || "",
        postcode: postcode || "",
        phone: phone || "",
      }}
      validationSchema={profileSchema}
      onSubmit={(values, { setSubmitting }) => {
        dispatch(updateUser(values));
        setIsEditing(false);
        setSubmitting(false);
      }}
    >
      {({ values, submitForm, isSubmitting }) => (
        <Form aria-label="billing-info-form">
          <div className={classes.formItems}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <CustomTextField
                  disabled={!isEditing}
                  label="First Name"
                  name="firstName"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <CustomTextField
                  disabled={!isEditing}
                  type="text"
                  label="Last Name"
                  name="lastName"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <CustomTextField
                  disabled={!isEditing}
                  name="email"
                  type="email"
                  label="Email"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <CustomTextField
                  disabled={!isEditing}
                  label="Phone Number"
                  name="phone"
                />
              </Grid>
              <Grid item item xs={12}>
                <CustomTextField
                  disabled={!isEditing}
                  label="Street"
                  name="street"
                />
              </Grid>
              <Grid item item xs={12} sm={5}>
                <CustomSelect
                  disabled={!isEditing}
                  name="country"
                  label="Country"
                  options={countries}
                />
              </Grid>
              <Grid item item xs={12} sm={4}>
                <CustomTextField
                  disabled={!isEditing}
                  name="state"
                  label="State"
                />
              </Grid>
              <Grid item item xs={12} sm={3}>
                <CustomTextField
                  disabled={!isEditing}
                  name="postcode"
                  label="Postcode"
                />
              </Grid>
            </Grid>
          </div>
          {isSubmitting && <LinearProgress />}
          <div>
            {!isEditing ? (
              <Button
                variant="contained"
                color="primary"
                disabled={isSubmitting}
                onClick={toggleEdit}
              >
                Edit
              </Button>
            ) : (
              <>
                <Button
                  classes={{ root: classes.cancelButton }}
                  variant="contained"
                  disabled={isSubmitting}
                  onClick={toggleEdit}
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  disabled={isSubmitting}
                  onClick={() => submitForm(values)}
                >
                  Update
                </Button>
              </>
            )}
          </div>
        </Form>
      )}
    </Formik>
  ) : (
    "Loading"
  );
}

export default BillingInfo;

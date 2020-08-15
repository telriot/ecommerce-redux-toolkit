import React from "react";
import { Formik, Form } from "formik";
import { Button, LinearProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { selectDashboardStatus, addNewAddress } from "./dashboardSlice";
import UserInfoForm from "../shared/UserInfoForm";
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
            <UserInfoForm />
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

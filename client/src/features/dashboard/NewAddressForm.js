import React from "react";
import { Formik, Form } from "formik";
import { Button, LinearProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch } from "react-redux";
import { addNewAddress } from "./dashboardSlice";
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
  progress: { marginBottom: theme.spacing(1) },
  resetButton: {
    marginRight: theme.spacing(2),
  },
}));

function BillingInfo() {
  const dispatch = useDispatch();
  const classes = useStyles();

  return (
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
        email: "",
      }}
      validationSchema={profileSchema}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        dispatch(addNewAddress(values));
        resetForm();
        setSubmitting(false);
      }}
    >
      {({ isSubmitting, resetForm }) => (
        <Form aria-label="new-address-info-form">
          <div className={classes.formItems}>
            <UserInfoForm />
          </div>
          {isSubmitting && <LinearProgress className={classes.progress} />}
          <div>
            <>
              <Button
                classes={{ root: classes.resetButton }}
                variant="contained"
                disabled={isSubmitting}
                onClick={resetForm}
              >
                Reset
              </Button>
              <Button
                variant="contained"
                color="secondary"
                disabled={isSubmitting}
                type="submit"
              >
                Submit
              </Button>
            </>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default BillingInfo;

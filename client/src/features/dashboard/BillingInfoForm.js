import React from "react";
import { Formik, Form } from "formik";
import { Button, LinearProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import {
  selectBillingInfo,
  selectDashboardStatus,
  updateUser,
} from "./dashboardSlice";
import UserInfoForm from "../shared/UserInfoForm";
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

function BillingInfoForm() {
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
    city,
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
        city: city || "",
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
            <UserInfoForm disabled={!isEditing} />
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

export default BillingInfoForm;

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
import CustomTextField from "../shared/CustomTextField";
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
  const { firstName, lastName, email, address, phone } = billingInfo;
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
        address: address || "",
        phone: phone || "",
      }}
      validationSchema={profileSchema}
      onSubmit={(values, { setSubmitting }) => {
        console.log("subbbaaa");
        dispatch(updateUser(values));
        setSubmitting(false);
      }}
    >
      {({ values, submitForm, isSubmitting }) => (
        <Form>
          <div className={classes.formItems}>
            <CustomTextField
              disabled={!isEditing}
              label="First Name"
              name="firstName"
            />
            <CustomTextField
              disabled={!isEditing}
              type="text"
              label="Last Name"
              name="lastName"
            />
            <CustomTextField
              disabled={!isEditing}
              name="email"
              type="email"
              label="Email"
            />
            <CustomTextField
              disabled={!isEditing}
              label="Address"
              name="address"
            />
            <CustomTextField
              disabled={!isEditing}
              label="Phone Number"
              name="phone"
            />
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

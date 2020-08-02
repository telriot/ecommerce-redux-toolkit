import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { attemptSignup, selectAuthStatus, clearAuthErrors } from "./authSlice";
import { Formik, Form } from "formik";
import { makeStyles } from "@material-ui/core/styles";
import { Button, LinearProgress } from "@material-ui/core";
import { signupSchema } from "../../validators";
import CustomTextField from "../shared/CustomTextField";

const useStyles = makeStyles((theme) => ({
  formItems: {
    display: "flex",
    flexDirection: "column",
    marginBottom: theme.spacing(3),
  },
}));

function SignupForm() {
  const classes = useStyles();
  const status = useSelector(selectAuthStatus);
  const dispatch = useDispatch();
  const errorMessage = useSelector((state) => state.auth.error);
  const clearApiErrors = () => {
    console.log("clear");
    errorMessage && dispatch(clearAuthErrors());
  };
  return (
    <Formik
      initialValues={{
        username: "",
        email: "",
        password: "",
      }}
      validationSchema={signupSchema}
      onSubmit={(values) => {
        dispatch(attemptSignup(values));
      }}
    >
      {({ submitForm, isValid, values }) => (
        <Form>
          <div className={classes.formItems} onClick={() => clearApiErrors()}>
            <CustomTextField
              label="Username"
              name="username"
              disabled={false}
            />
            <CustomTextField
              type="email"
              label="Email Address"
              name="email"
              disabled={false}
            />
            <CustomTextField
              type="password"
              label="Password"
              name="password"
              disabled={false}
            />
          </div>
          {status !== "idle" && <LinearProgress />}
          <div>
            <Button
              variant="contained"
              color="primary"
              disabled={Boolean(
                !values.username ||
                  !values.password ||
                  !values.email ||
                  !isValid ||
                  status !== "idle"
              )}
              onClick={() => submitForm(values)}
              fullWidth
            >
              Sign Up
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default SignupForm;

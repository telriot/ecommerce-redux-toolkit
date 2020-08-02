import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { attemptLogin, selectAuthStatus, clearAuthErrors } from "./authSlice";
import { Formik, Form } from "formik";
import { makeStyles } from "@material-ui/core/styles";
import { Button, LinearProgress } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import { loginSchema } from "../../validators";
import CustomTextField from "../shared/CustomTextField";

const useStyles = makeStyles((theme) => ({
  formItems: {
    display: "flex",
    flexDirection: "column",
    marginBottom: theme.spacing(3),
  },
}));

function LoginForm() {
  const classes = useStyles();
  const status = useSelector(selectAuthStatus);
  const dispatch = useDispatch();
  const signupMessage = useSelector((state) => state.auth.successMessage);
  const errorMessage = useSelector((state) => state.auth.error);
  const clearApiErrors = () => {
    console.log("clear");
    errorMessage && dispatch(clearAuthErrors());
  };
  return (
    <Formik
      initialValues={{
        username: "",
        password: "",
      }}
      validationSchema={loginSchema}
      onSubmit={(values) => {
        dispatch(attemptLogin(values));
      }}
    >
      {({ isValid, values, submitForm }) => (
        <Form>
          {signupMessage && <Alert severity="success">{signupMessage}</Alert>}
          {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
          <div className={classes.formItems} onClick={() => clearApiErrors()}>
            <CustomTextField
              label="Username"
              name="username"
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
                  !isValid ||
                  status !== "idle"
              )}
              onClick={() => submitForm(values)}
              fullWidth
            >
              Login
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default LoginForm;

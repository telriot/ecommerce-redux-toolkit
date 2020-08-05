import React from "react";
import {
  Button,
  Dialog,
  DialogContent,
  Tabs,
  Tab,
  Typography,
} from "@material-ui/core";
import {
  selectAuthDialogIsOpen,
  closedAuthDialog,
  selectAuthDialogActiveTab,
  setAuthDialogTab,
} from "./authSlice";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import { makeStyles } from "@material-ui/core/styles";

import { useDispatch, useSelector } from "react-redux";
const useStyles = makeStyles((theme) => ({
  contents: {
    display: "flex",
    flexDirection: "column",
  },
}));
function AuthDialog() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const isOpen = useSelector(selectAuthDialogIsOpen);
  const activeTab = useSelector(selectAuthDialogActiveTab);
  const handleChange = (event, newValue) => {
    dispatch(setAuthDialogTab(newValue));
  };

  const handleClose = () => {
    dispatch(closedAuthDialog());
  };

  const handleTwitterLogin = () => {
    window.open("http://localhost:5000/api/auth/twitter", "_self");
  };

  return (
    <div>
      <Dialog
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <Tabs
          value={activeTab}
          indicatorColor="primary"
          textColor="primary"
          onChange={handleChange}
          variant="fullWidth"
          aria-label="login-signup tab"
        >
          <Tab label="Log In" />
          <Tab label="Sign Up" />
        </Tabs>

        <DialogContent>
          <div className={classes.contents}>
            {activeTab === 0 ? <LoginForm /> : <SignupForm />}
            <Typography variant="button" align="center">
              or
            </Typography>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleTwitterLogin}
              fullWidth
            >
              Login via Twitter{" "}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AuthDialog;

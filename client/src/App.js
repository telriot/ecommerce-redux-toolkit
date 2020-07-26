import React from "react";
import { Switch, Route } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch } from "react-redux";
import Navbar from "./layout/Navbar";

import { fetchAuthState } from "./features/auth/authSlice";

const useStyles = makeStyles((theme) => ({
  container: {
    [theme.breakpoints.up("sm")]: {
      paddingTop: "40px",
    },
  },
}));

function App() {
  const classes = useStyles();
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchAuthState());
  });
  return (
    <div>
      <Route exact path="/*" component={Navbar}></Route>
      <div className={classes.container}>
        <Switch>
          <Route exact path="/"></Route>
        </Switch>
      </div>
    </div>
  );
}

export default App;

import React from "react";
import { Switch, Route } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch } from "react-redux";
import Navbar from "./layout/Navbar";

import { fetchAuthState } from "./features/auth/authSlice";
import AllProducts from "./features/products/AllProducts";

const useStyles = makeStyles((theme) => ({
  container: {},
}));

function App() {
  const classes = useStyles();
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchAuthState());
  }, [dispatch]);
  return (
    <div>
      <Route exact path="/*" component={Navbar}></Route>
      <Switch>
        <Route exact path="/" component={AllProducts}></Route>
      </Switch>
    </div>
  );
}

export default App;

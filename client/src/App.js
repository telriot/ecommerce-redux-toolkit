import React from "react";
import { Switch, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "./layout/Navbar";
import {
  fetchAuthState,
  selectAuthorizedUser,
} from "./features/auth/authSlice";
import AllProducts from "./features/products/AllProducts";
import CartDetail from "./features/cart/CartDetail";
import CheckoutView from "./features/checkout/CheckoutView";
import Dashboard from "./features/dashboard/Dashboard";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { fetchCart } from "./features/cart/cartSlice";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

function App() {
  const dispatch = useDispatch();
  const authUser = useSelector(selectAuthorizedUser);
  React.useEffect(() => {
    dispatch(fetchAuthState());
  }, [dispatch]);
  React.useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch, authUser]);

  return (
    <div>
      <Elements stripe={stripePromise}>
        <Route exact path="/*" component={Navbar}></Route>
        <Switch>
          <Route exact path="/" component={AllProducts}></Route>
          <Route exact path="/cart" component={CartDetail}></Route>

          <Route exact path="/checkout" component={CheckoutView}></Route>

          <Route exact path="/dashboard" component={Dashboard}></Route>
        </Switch>
      </Elements>
    </div>
  );
}

export default App;

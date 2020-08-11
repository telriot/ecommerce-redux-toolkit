import React from "react";
import { Switch, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "./layout/Navbar";
import {
  fetchAuthState,
  selectAuthorizedUser,
} from "./features/auth/authSlice";
import CartDetail from "./features/cart/CartDetail";
import CheckoutView from "./features/checkout/CheckoutView";
import Dashboard from "./features/dashboard/Dashboard";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { fetchCart } from "./features/cart/cartSlice";
import MainView from "./features/products/MainView";
import ProductDetail from "./features/products/ProductDetail";
import { fetchRecentViews } from "./features/recentViews/recentViewsSlice";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

function App() {
  const dispatch = useDispatch();
  const authUser = useSelector(selectAuthorizedUser);
  React.useEffect(() => {
    dispatch(fetchAuthState());
  }, [dispatch]);
  React.useEffect(() => {
    dispatch(fetchCart());
    dispatch(fetchRecentViews());
  }, [dispatch, authUser]);

  return (
    <div>
      <Elements stripe={stripePromise}>
        <Route exact path="/*" component={Navbar}></Route>
        <Switch>
          <Route exact path="/" component={MainView}></Route>
          <Route exact path="/cart" component={CartDetail}></Route>
          <Route exact path="/checkout" component={CheckoutView}></Route>
          <Route exact path="/dashboard" component={Dashboard}></Route>
          <Route exact path="/products/:id" component={ProductDetail}></Route>
        </Switch>
      </Elements>
    </div>
  );
}

export default App;

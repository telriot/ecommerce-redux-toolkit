import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import cartReducer from "../features/cart/cartSlice";
import dashboardReducer from "../features/dashboard/dashboardSlice";
import productsReducer from "../features/products/productsSlice";
import checkoutReducer from "../features/checkout/checkoutSlice";

export default configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    dashboard: dashboardReducer,
    products: productsReducer,
    checkout: checkoutReducer,
  },
});

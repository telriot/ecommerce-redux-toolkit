import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import productsReducer from "../features/products/productsSlice";
export default configureStore({
  reducer: {
    auth: authReducer,
    products: productsReducer,
  },
});

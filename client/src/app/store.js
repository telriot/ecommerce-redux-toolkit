import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import cartReducer from "../features/cart/cartSlice";
import dashboardReducer from "../features/dashboard/dashboardSlice";
import productsReducer from "../features/products/productsSlice";
import checkoutReducer from "../features/checkout/checkoutSlice";
import filtersReducer from "../features/filters/filtersSlice";
import recentViewsReducer from "../features/recentViews/recentViewsSlice";
import wishlistReducer from "../features/wishlist/wishlistSlice";

export default configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    dashboard: dashboardReducer,
    products: productsReducer,
    checkout: checkoutReducer,
    filters: filtersReducer,
    recentViews: recentViewsReducer,
    wishlist: wishlistReducer,
  },
});

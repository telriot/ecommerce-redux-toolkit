import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  status: "idle",
  billingInfo: {
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    phone: "",
  },
  orders: [],
  ordersPage: 1,
  ordersTotalPages: 1,
  ordersPerPage: 10,
  wishlistItems: [],
  wishlistItemsPage: 1,
  wishlistItemsTotalPages: 1,
  wishlistItemsPerPage: 10,
};

export const fetchUser = createAsyncThunk(
  "dashboard/fetchUser",
  async (_, { getState }) => {
    const id = getState().auth.user._id;
    if (id !== null) {
      try {
        const response = await axios.get(`/api/users/${id}`);
        return { success: true, user: response.data };
      } catch (error) {
        console.error(error);
        return { success: false, error };
      }
    } else {
      return { success: false, error: null };
    }
  }
);
export const updateUser = createAsyncThunk(
  "dashboard/updateUser",
  async (formData, { getState }) => {
    const id = getState().auth.user._id;
    const { firstName, lastName, email, address, phone } = formData;
    const updateObj = {
      firstName,
      lastName,
      email,
      address,
      phone,
    };
    try {
      const response = await axios.put(`/api/users/${id}`, updateObj);
      return { success: true, user: response.data };
    } catch (error) {
      console.error(error);
      return { success: false, error };
    }
  }
);
export const fetchOrders = createAsyncThunk(
  "dashboard/fetchOrders",
  async (_, { getState }) => {
    const id = getState().auth.user._id;
    if (id !== null) {
      try {
        const response = await axios.get(`/api/users/orders/${id}`);
        return { success: true, orders: response.data };
      } catch (error) {
        console.error(error);
        return { success: false, error };
      }
    } else {
      return { success: false, error: null };
    }
  }
);
export const fetchWishlistItems = createAsyncThunk(
  "dashboard/fetchWishlistItems",
  async (_, { getState }) => {
    const id = getState().auth.user._id;
    try {
      const response = await axios.get(`/api/users/wishlist/${id}`);
      return { success: true, wishlistItems: response.data };
    } catch (error) {
      console.error(error);
      return { success: false, error };
    }
  }
);
export const updateWishlist = createAsyncThunk(
  "wishlist/updateWishlist",
  async (_, { getState }) => {
    const id = getState().auth.user._id;
    const wishlistItems = getState().dashboard.wishlistItems;
    try {
      const response = await axios.put(`/api/users/wishlist/${id}`, {
        wishlist: wishlistItems,
      });
      return { wishlistItems: response.data, error: null };
    } catch (error) {
      console.log(error);
    }
  }
);

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    pageChanged: {
      reducer(state, action) {
        state.ordersPage = action.payload;
      },
    },
    wishlistPageChanged: {
      reducer(state, action) {
        state.wishlistPage = action.payload;
      },
    },
    wishlistItemAdded: {
      reducer(state, action) {
        const item = action.payload;
        state.wishlistItems.push(item);
      },
    },
    wishlistItemRemoved: {
      reducer(state, action) {
        const item = action.payload;
        state.wishlistItems = state.wishlistItems.filter(
          (stateItem) => stateItem._id !== item._id
        );
      },
    },
    wishlistReset: {
      reducer(state) {
        state.wishlistItems = [];
      },
    },
  },
  extraReducers: {
    [fetchUser.pending]: (state, action) => {
      state.status = "pending";
    },

    [fetchUser.fulfilled]: (state, action) => {
      if (action.payload.success) {
        const {
          firstName,
          lastName,
          email,
          address,
          phone,
        } = action.payload.user;
        state.billingInfo = { firstName, lastName, email, address, phone };
      } else {
        state.error = action.error;
      }
      state.status = "fulfilled";
    },
    [fetchUser.rejected]: (state, action) => {
      state.error = "Something went wrong with our servers";
      state.status = "rejected";
    },
    [updateUser.pending]: (state, action) => {
      state.status = "pending";
    },
    [updateUser.fulfilled]: (state, action) => {
      if (action.payload.success) {
        const {
          firstName,
          lastName,
          email,
          address,
          phone,
        } = action.payload.user;
        state.billingInfo = { firstName, lastName, email, address, phone };
        state.status = "fulfilled";
      } else {
        state.error = action.error;
      }
      state.status = "fulfilled";
    },
    [updateUser.rejected]: (state, action) => {
      state.error = "Something went wrong with our servers";
      state.status = "rejected";
    },
    [fetchOrders.pending]: (state, action) => {
      state.status = "pending";
    },
    [fetchOrders.fulfilled]: (state, action) => {
      if (action.payload.success) {
        const { orders } = action.payload;

        state.orders = orders || [];
        state.ordersTotalPages = orders
          ? Math.ceil(orders.length / state.ordersPerPage)
          : 0;
      } else {
        state.error = action.error;
      }
      state.status = "fulfilled";
    },
    [fetchWishlistItems.rejected]: (state, action) => {
      state.error = "Something went wrong with our servers";
      state.status = "rejected";
    },
    [fetchWishlistItems.fulfilled]: (state, action) => {
      if (action.payload.success) {
        const { wishlistItems } = action.payload;
        state.wishlistItems = wishlistItems || [];
        state.wishlistItemsTotalPages = wishlistItems
          ? Math.ceil(wishlistItems.length / state.wishlistItemsPerPage)
          : 0;
      } else {
        state.error = action.error;
      }
      state.status = "fulfilled";
    },
    [fetchWishlistItems.rejected]: (state, action) => {
      state.error = "Something went wrong with our servers";
      state.status = "rejected";
    },
  },
});

export const selectBillingInfo = (state) => state.dashboard.billingInfo;
export const selectDashboardStatus = (state) => state.dashboard.status;
export const {
  pageChanged,
  wishlistPageChanged,
  wishlistItemAdded,
  wishlistItemRemoved,
  wishlistReset,
} = dashboardSlice.actions;
export default dashboardSlice.reducer;

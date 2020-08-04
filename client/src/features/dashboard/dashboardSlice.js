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
const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {},
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
        state.orders = orders;
      } else {
        state.error = action.error;
      }
      state.status = "fulfilled";
    },
    [fetchOrders.rejected]: (state, action) => {
      state.error = "Something went wrong with our servers";
      state.status = "rejected";
    },
  },
});

export const selectBillingInfo = (state) => state.dashboard.billingInfo;
export const selectDashboardStatus = (state) => state.dashboard.status;
//export const {} = dashboardSlice.actions;
export default dashboardSlice.reducer;

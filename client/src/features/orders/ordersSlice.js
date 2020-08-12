import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  status: "idle",
  orders: [],
  ordersPage: 1,
  ordersTotalPages: 1,
  ordersPerPage: 10,
};

export const fetchOrders = createAsyncThunk(
  "orders/fetchOrders",
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
const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    pageChanged: {
      reducer(state, action) {
        state.ordersPage = action.payload;
      },
    },
  },
  extraReducers: {
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
    [fetchOrders.rejected]: (state, action) => {
      state.error = "Something went wrong with our servers";
      state.status = "rejected";
    },
  },
});

export const selectBillingInfo = (state) => state.orders.billingInfo;
export const selectDashboardStatus = (state) => state.orders.status;
export const { pageChanged } = ordersSlice.actions;
export default ordersSlice.reducer;
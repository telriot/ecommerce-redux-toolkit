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
};

export const fetchUser = createAsyncThunk(
  "dashboard/fetchUser",
  async (_, { getState }) => {
    const id = getState().auth.user._id;
    try {
      const response = await axios.get(`/api/users/${id}`);
      return response.data;
    } catch (error) {
      console.error(error);
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
      return response.data;
    } catch (error) {
      console.error(error);
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
      const { firstName, lastName, email, address, phone } = action.payload;
      state.billingInfo = { firstName, lastName, email, address, phone };
      state.error = action.error;
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
      const { firstName, lastName, email, address, phone } = action.payload;
      state.billingInfo = { firstName, lastName, email, address, phone };
      state.error = action.error;
      state.status = "fulfilled";
    },
    [updateUser.rejected]: (state, action) => {
      state.error = "Something went wrong with our servers";
      state.status = "rejected";
    },
  },
});

export const selectBillingInfo = (state) => state.dashboard.billingInfo;
export const selectDashboardStatus = (state) => state.dashboard.status;
//export const {} = dashboardSlice.actions;
export default dashboardSlice.reducer;

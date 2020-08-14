import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  status: "idle",
  billingInfo: {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    street: "",
    country: "",
    state: "",
    postcode: "",
  },
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
    try {
      const response = await axios.put(`/api/users/${id}`, { ...formData });
      return { success: true, user: response.data };
    } catch (error) {
      console.error(error);
      return { success: false, error };
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

    [fetchUser.fulfilled]: (thisState, action) => {
      if (action.payload.success) {
        const {
          firstName,
          lastName,
          email,
          phone,
          street,
          country,
          state,
          postcode,
        } = action.payload.user;
        thisState.billingInfo = {
          firstName,
          lastName,
          email,
          phone,
          street,
          country,
          state,
          postcode,
        };
      } else {
        thisState.error = action.error;
      }
      thisState.status = "fulfilled";
    },
    [fetchUser.rejected]: (state, action) => {
      state.error = "Something went wrong with our servers";
      state.status = "rejected";
    },
    [updateUser.pending]: (state, action) => {
      state.status = "pending";
    },
    [updateUser.fulfilled]: (thisState, action) => {
      if (action.payload.success) {
        const {
          firstName,
          lastName,
          email,
          phone,
          street,
          country,
          state,
          postcode,
        } = action.payload.user;
        thisState.billingInfo = {
          firstName,
          lastName,
          email,
          phone,
          street,
          country,
          state,
          postcode,
        };
        thisState.status = "fulfilled";
      } else {
        thisState.error = action.error;
      }
      thisState.status = "fulfilled";
    },
    [updateUser.rejected]: (state, action) => {
      state.error = "Something went wrong with our servers";
      state.status = "rejected";
    },
  },
});

export const selectBillingInfo = (state) => state.dashboard.billingInfo;
export const selectDashboardStatus = (state) => state.dashboard.status;
export default dashboardSlice.reducer;

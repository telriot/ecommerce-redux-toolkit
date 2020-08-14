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
    city: "",
    country: "",
    state: "",
    postcode: "",
  },
  addressList: [],
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
export const addNewAddress = createAsyncThunk(
  "dashboard/addNewAddress",
  async (address, { getState }) => {
    try {
      const id = getState().auth.user._id;
      const response = await axios.put(`api/users/${id}/new-address`, address);
      return { success: true, addressList: response.data };
    } catch (error) {
      console.error(error);
      return { success: false, error };
    }
  }
);
export const removeAddress = createAsyncThunk(
  "dashboard/addNewAddress",
  async (index, { getState }) => {
    try {
      const id = getState().auth.user._id;
      const response = await axios.delete(`api/users/${id}/remove-address`, {
        params: { index },
      });
      return { success: true, addressList: response.data };
    } catch (error) {
      console.error(error);
      return { success: false, error };
    }
  }
);

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    newAddressAdded: {
      reducer(state, action) {
        state.addressList.push(action.payload);
      },
    },
  },
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
          city,
          country,
          state,
          postcode,
          addressList,
        } = action.payload.user;
        thisState.billingInfo = {
          firstName,
          lastName,
          email,
          phone,
          street,
          city,

          country,
          state,
          postcode,
        };
        thisState.addressList = addressList;
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
          city,

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
          city,

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
    [updateUser.rejected]: (state) => {
      state.error = "Something went wrong with our servers";
      state.status = "rejected";
    },
    [addNewAddress.pending]: (state) => {
      state.status = "pending";
    },
    [addNewAddress.fulfilled]: (state, action) => {
      if (action.payload.success) {
        state.status = "fulfilled";
        state.addressList = action.payload.addressList;
      } else {
        state.error = action.error;
      }
      state.status = "fulfilled";
    },
    [addNewAddress.rejected]: (state) => {
      state.error = "Something went wrong with our servers";
      state.status = "rejected";
    },
    [removeAddress.pending]: (state) => {
      state.status = "pending";
    },
    [removeAddress.fulfilled]: (state, action) => {
      if (action.payload.success) {
        state.status = "fulfilled";
        state.addressList = action.payload.addressList;
      } else {
        state.error = action.error;
      }
      state.status = "fulfilled";
    },
    [removeAddress.rejected]: (state) => {
      state.error = "Something went wrong with our servers";
      state.status = "rejected";
    },
  },
});

export const selectBillingInfo = (state) => state.dashboard.billingInfo;
export const selectDashboardStatus = (state) => state.dashboard.status;
export default dashboardSlice.reducer;

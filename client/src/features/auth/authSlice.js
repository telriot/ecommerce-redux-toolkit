import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = { user: null, isAuth: null, error: null };

export const fetchAuthState = createAsyncThunk(
  "auth/fetchAuthState",
  async () => {
    try {
      const response = await axios.get("/api/auth/login/success");
      const { success, user } = response.data;
      return { success, user, error: null };
    } catch (error) {
      return { success: false, user: null, error: error.message };
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchAuthState.fulfilled]: (state, action) => {
      const { success, user, error } = action.payload;
      state.isAuth = success;
      state.user = user;
      state.error = error;
    },
    [fetchAuthState.rejected]: (state, action) => {
      state.isAuth = null;
      state.user = null;
      state.error = "Something went wrong with our servers";
    },
  },
});

export const selectAuthorizedUser = (state) => state.auth.user;

export default authSlice.reducer;

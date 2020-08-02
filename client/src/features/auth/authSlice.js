import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  status: "idle",
  user: { _id: null },
  isAuth: null,
  error: null,
  successMessage: null,
  authDialogIsOpen: false,
  authDialogActiveTab: 0,
};

export const fetchAuthState = createAsyncThunk(
  "auth/fetchAuthState",
  async () => {
    try {
      const response = await axios.get("/api/auth/login/success");
      const { success, user } = response.data;
      return { success, user, error: null };
    } catch (error) {
      return { success: false, user: initialState.user, error: error.message };
    }
  }
);
export const attemptLogin = createAsyncThunk(
  "auth/attemptLogin",
  async (loginData) => {
    try {
      const loginObj = {
        username: loginData.username,
        password: loginData.password,
      };
      const response = await axios.post("/api/auth/login", loginObj, {
        "Content-Type": "application/x-www-form-urlencoded",
      });
      const { success, user } = response.data;
      return { success, user, error: null };
    } catch (error) {
      return { success: false, user: initialState.user, error: error.message };
    }
  }
);
export const attemptSignup = createAsyncThunk(
  "auth/attemptSignup",
  async (signupData) => {
    try {
      const signupObj = {
        username: signupData.username,
        password: signupData.password,
        email: signupData.email,
      };
      const response = await axios.post("/api/auth/signup", signupObj, {
        "Content-Type": "application/x-www-form-urlencoded",
      });
      const { success, user } = response.data;
      return { success, user, error: null };
    } catch (error) {
      return { success: false, user: initialState.user, error: error.message };
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    openedAuthDialog: {
      reducer(state) {
        state.authDialogIsOpen = true;
      },
    },
    closedAuthDialog: {
      reducer(state) {
        state.authDialogIsOpen = false;
        state.error = null;
      },
    },
    setAuthDialogTab: {
      reducer(state, action) {
        state.authDialogActiveTab = action.payload;
        state.error = null;
      },
    },
    clearAuthErrors: {
      reducer(state) {
        state.error = null;
      },
    },
  },
  extraReducers: {
    [fetchAuthState.fulfilled]: (state, action) => {
      const { success, user, error } = action.payload;
      state.isAuth = success;
      state.user = user ? user : initialState.user;
      state.error = error;
    },
    [fetchAuthState.rejected]: (state, action) => {
      state.isAuth = null;
      state.user = initialState.user;
      state.error = "Something went wrong with our servers";
    },
    [attemptLogin.fulfilled]: (state, action) => {
      const { success, user } = action.payload;
      if (success) {
        state.authDialogIsOpen = false;
        state.error = null;
      } else {
        state.error = "Invalid Credentials";
      }
      state.isAuth = success;
      state.user = user ? user : initialState.user;

      state.status = "idle";
    },
    [attemptLogin.pending]: (state) => {
      state.status = "pending";
      state.error = null;
    },
    [attemptLogin.rejected]: (state) => {
      state.isAuth = null;
      state.user = initialState.user;
      state.error = "Something went wrong with our servers";
      state.status = "idle";
    },
    [attemptSignup.fulfilled]: (state, action) => {
      const { success } = action.payload;
      if (success) {
        state.authDialogActiveTab = 0;
        state.successMessage = "Signup successful. You can now login";
        state.error = null;
      } else {
        state.error = "Something went wrong. Please try again";
      }
      state.status = "idle";
    },
    [attemptSignup.pending]: (state) => {
      state.status = "pending";
      state.error = null;
    },
    [attemptSignup.rejected]: (state) => {
      state.isAuth = null;
      state.user = initialState.user;
      state.error = "Something went wrong with our servers";
      state.status = "idle";
    },
  },
});
export const {
  openedAuthDialog,
  closedAuthDialog,
  setAuthDialogTab,
  clearAuthErrors,
} = authSlice.actions;
export const selectAuthStatus = (state) => state.auth.status;
export const selectAuthDialogActiveTab = (state) =>
  state.auth.authDialogActiveTab;
export const selectAuthDialogIsOpen = (state) => state.auth.authDialogIsOpen;
export const selectAuthorizedUser = (state) => state.auth.user;
export default authSlice.reducer;

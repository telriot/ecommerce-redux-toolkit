import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  status: "idle",
  recentViews: [],
};

export const fetchRecentViews = createAsyncThunk(
  "products/fetchRecentViews",
  async (_, { getState }) => {
    const id = getState().auth.user._id;
    let recentViews =
      JSON.parse(localStorage.getItem("recentViews")) || initialState;
    if (id === null) {
      return { recentViews, error: null };
    } else {
      if (recentViews.length) {
        try {
          const response = await axios.get(`/api/products/recentViews/${id}`);
          const joinedViews = recentViews.concat(response.data).slice(0, 10);
          const update = await axios.put(`/api/products/recentViews/${id}`, {
            recentViews: joinedViews,
          });
          localStorage.clear();
          return { success: true, recentViews: update.data, error: null };
        } catch (error) {
          console.log(error);
          return { success: false, error };
        }
      } else {
        try {
          const response = await axios.get(`/api/products/recentViews/${id}`);
          return { success: true, recentViews: response.data, error: null };
        } catch (error) {
          console.log(error);
        }
      }
    }
  }
);
export const updateRecentViews = createAsyncThunk(
  "products/updateRecentViews",
  async (_, { getState }) => {
    const id = getState().auth.user._id;
    const recentViews = getState().recentViews.recentViews;
    if (id === null) {
      localStorage.setItem("recentViews", JSON.stringify(recentViews));
    } else {
      try {
        const updateObj = { recentViews };
        const response = await axios.put(
          `/api/products/recentViews/${id}`,
          updateObj
        );
        return { recentViews: response.data, error: null };
      } catch (error) {
        console.log(error);
        return { error };
      }
    }
  }
);

const productsSlice = createSlice({
  name: "recentViews",
  initialState,
  reducers: {
    recentViewAdded: {
      reducer(state, action) {
        if (!action.payload.hasOwnProperty("_id")) return;
        if (state.recentViews.length === 10) {
          state.recentViews.pop();
        }
        if (
          !state.recentViews.some(
            (product) => product._id === action.payload._id
          )
        ) {
          state.recentViews.unshift(action.payload);
        }
      },
    },
  },
  extraReducers: {
    [fetchRecentViews.pending]: (state, action) => {
      state.status = "pending";
    },
    [fetchRecentViews.fulfilled]: (state, action) => {
      const { recentViews, success, error } = action.payload;
      if (success) {
        state.recentViews = recentViews;
      }
      state.error = action.payload.error;
      state.status = "fulfilled";
    },
    [fetchRecentViews.rejected]: (state, action) => {
      state.error = "Something went wrong with our servers";
      state.status = "rejected";
    },
  },
});

export const { recentViewAdded } = productsSlice.actions;

export default productsSlice.reducer;

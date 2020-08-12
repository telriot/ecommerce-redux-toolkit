import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  status: "idle",
  wishlistItems: [],
  wishlistItemsPage: 1,
  wishlistItemsTotalPages: 1,
  wishlistItemsPerPage: 10,
};

export const fetchWishlistItems = createAsyncThunk(
  "wishlist/fetchWishlistItems",
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
    const wishlistItems = getState().wishlist.wishlistItems;
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

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
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
    [fetchWishlistItems.pending]: (state, action) => {
      state.status = "pending";
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

export const {
  wishlistPageChanged,
  wishlistItemAdded,
  wishlistItemRemoved,
  wishlistReset,
} = wishlistSlice.actions;
export default wishlistSlice.reducer;

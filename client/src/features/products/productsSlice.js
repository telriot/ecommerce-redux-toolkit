import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = { page: 1, limit: 10, products: [], status: "idle" };

export const fetchAllProducts = createAsyncThunk(
  "products/fetchAllProducts",
  async (_, { getState }) => {
    const { page, limit } = getState().products;
    try {
      const products = await axios.get("api/products/", {
        params: { page, limit },
      });
      return products;
    } catch (error) {
      console.log(error);
    }
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchAllProducts.pending]: (state, action) => {
      state.status = "pending";
    },
    [fetchAllProducts.fulfilled]: (state, action) => {
      const products = action.payload ? action.payload.data.docs : null;
      state.products = products;
      state.error = action.error;
      state.status = "fulfilled";
    },
    [fetchAllProducts.rejected]: (state, action) => {
      state.error = "Something went wrong with our servers";
      state.status = "rejected";
    },
  },
});

export const selectAllProducts = (state) => state.products.products;
export const selectIsFetchingProducts = (state) => state.products.status;

export default productsSlice.reducer;

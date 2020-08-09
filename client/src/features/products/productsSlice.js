import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  page: 1,
  hasNextPage: false,
  hasPrevPage: false,
  totalPages: 1,
  limit: 10,
  products: [],
  status: "idle",
};
export const isStockAvailable = (cartProducts, product) =>
  product.availability &&
  (!cartProducts.hasOwnProperty(product._id) ||
    (cartProducts.hasOwnProperty(product._id) &&
      cartProducts[product._id].itemsInCart < product.availability));
export const fetchAllProducts = createAsyncThunk(
  "products/fetchAllProducts",
  async (_, { getState }) => {
    const { page, limit } = getState().products;
    const { textFilter, brandFilter, departmentFilter } = getState().filters;
    try {
      const response = await axios.get("api/products/", {
        params: { page, limit, textFilter, brandFilter, departmentFilter },
      });
      return {
        products: response.data.docs,
        totalPages: response.data.totalPages,
        page: response.data.page,
      };
    } catch (error) {
      console.log(error);
      return error;
    }
  }
);
export const removePurchasedItems = createAsyncThunk(
  "products/removePurchasedItems",
  async (products, { getState }) => {
    let purchasedItems = [];
    for (let product of Object.values(products)) {
      purchasedItems.push({ _id: product._id, quantity: product.itemsInCart });
    }
    try {
      const response = await axios.put("api/products/", {
        products: purchasedItems,
        action: "remove",
      });
      return response.data;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    pageChanged: {
      reducer(state, action) {
        console.log(action.payload);
        state.page = action.payload;
      },
    },
  },
  extraReducers: {
    [fetchAllProducts.pending]: (state, action) => {
      state.status = "pending";
    },
    [fetchAllProducts.fulfilled]: (state, action) => {
      const { products, totalPages } = action.payload;
      state.products = products;
      state.totalPages = totalPages;
      state.error = action.payload.error;
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
export const { pageChanged } = productsSlice.actions;

export default productsSlice.reducer;

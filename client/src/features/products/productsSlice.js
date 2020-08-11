import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  page: 1,
  hasNextPage: false,
  hasPrevPage: false,
  totalPages: 1,
  limit: 24,
  products: [],
  status: "idle",
  selectedProduct: {},
  fromTheSameCategory: [],
  sortOrder: "",
  recentViews: [],
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
    const {
      textFilter,
      brandFilter,
      departmentFilter,
      minPriceFilter,
      maxPriceFilter,
    } = getState().filters;
    const { sortOrder } = getState().products;

    try {
      const response = await axios.get("api/products/", {
        params: {
          page,
          limit,
          textFilter,
          brandFilter,
          departmentFilter,
          minPriceFilter,
          maxPriceFilter,
          sortOrder,
        },
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
export const fetchProduct = createAsyncThunk(
  "products/fetchProduct",
  async (_id, { getState }) => {
    try {
      const response = await axios.get(`/api/products/${_id}`);
      return { success: true, product: response.data };
    } catch (error) {
      console.log(error);
      return { success: false, error };
    }
  }
);
export const fetchFromTheSameCategory = createAsyncThunk(
  "products/fetchFromTheSameCategory",
  async (department, { getState }) => {
    try {
      const response = await axios.get("/api/products", {
        params: { limit: 36, departmentFilter: department },
      });
      return { success: true, products: response.data.docs };
    } catch (error) {
      console.log(error);
      return { success: false, error };
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
        state.page = action.payload;
      },
    },
    sortOrderSet: {
      reducer(state, action) {
        state.sortOrder = action.payload;
      },
    },
    recentViewAdded: {
      reducer(state, action) {
        if (state.recentViews.length === 10) {
          state.recentViews.pop();
        }
        if (!state.recentViews.includes(action.payload._id)) {
          state.recentViews.unshift(action.payload);
        }
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
    [fetchFromTheSameCategory.pending]: (state, action) => {
      state.status = "pending";
    },
    [fetchFromTheSameCategory.fulfilled]: (state, action) => {
      const { products, success } = action.payload;
      if (success) {
        state.fromTheSameCategory = products;
      } else {
        state.error = action.payload.error;
      }
      state.status = "fulfilled";
    },
    [fetchFromTheSameCategory.rejected]: (state, action) => {
      state.error = "Something went wrong with our servers";
      state.status = "rejected";
    },
    [fetchProduct.pending]: (state, action) => {
      state.status = "pending";
    },
    [fetchProduct.fulfilled]: (state, action) => {
      const { product, success } = action.payload;
      if (success) {
        state.selectedProduct = product;
        state.status = "fulfilled";
      } else {
        state.error = action.payload.error;
        state.status = "fulfilled";
      }
    },
    [fetchProduct.rejected]: (state, action) => {
      state.error = "Something went wrong with our servers";
      state.status = "rejected";
    },
  },
});

export const selectAllProducts = (state) => state.products.products;
export const selectIsFetchingProducts = (state) => state.products.status;
export const selectSortOrder = (state) => state.products.sortOrder;
export const { pageChanged, sortOrderSet } = productsSlice.actions;

export default productsSlice.reducer;

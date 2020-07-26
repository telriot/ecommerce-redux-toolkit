import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = { status: "idle", products: {}, count: 0, total: 0 };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    productAdded: {
      reducer(state, action) {
        const { _id, quantity, price } = action.payload;
        const parsedPrice = parseFloat(price.slice(1, -1)).toFixed(2);
        if (!state.products[_id]) {
          state.products[_id] = action.payload;
        } else {
          state.products[_id].quantity += quantity;
        }
        state.count += quantity;
        state.total += parsedPrice * quantity;
      },
    },
    productRemoved: {
      reducer(state, action) {
        const { _id, quantity, price } = action.payload;
        const parsedPrice = parseFloat(price.slice(1, -1)).toFixed(2);
        const removalQuantity =
          state.products[_id].quantity < quantity
            ? state.products[_id].quantity
            : quantity;
        if (!state.products[_id]) {
          console.log("No product to remove");
        } else {
          state.products[_id].quantity -= removalQuantity;
        }
        state.count -= removalQuantity;
        state.total -= parsedPrice * removalQuantity;
      },
    },
    productDeleted: {
      reducer(state, action) {
        console.log(action);
        const { _id } = action.payload;
        if (!state.products[_id]) {
          console.log("No product to remove");
        } else {
          state.count -= state.products[_id].quantity;
          delete state.products[_id];
        }
      },
    },
  },
  extraReducers: {},
});

export const selectCartItemCount = (state) => state.cart.count;
export const selectCartContents = (state) => state.cart.products;
export const selectCartTotal = (state) => state.cart.total;

export const {
  productAdded,
  productRemoved,
  productDeleted,
} = cartSlice.actions;
export default cartSlice.reducer;

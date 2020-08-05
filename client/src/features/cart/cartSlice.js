import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  status: "idle",
  products: {},
  count: 0,
  shipping: 0,
  itemTotal: 0,
  taxPercent: 8,
  total: 0,
};

export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (_, { getState }) => {
    const id = getState().auth.user._id;
    if (id === null) {
      let cart;
      cart = JSON.parse(localStorage.getItem("cart")) || initialState;
      return { cart, error: null };
    } else {
      try {
        const response = await axios.get(`/api/users/cart/${id}`);
        return { cart: response.data, error: null };
      } catch (error) {
        console.log(error);
      }
    }
  }
);
export const updateCart = createAsyncThunk(
  "cart/updateCart",
  async (_, { getState }) => {
    const id = getState().auth.user._id;
    const cart = getState().cart;
    if (id === null) {
      localStorage.setItem("cart", JSON.stringify(cart));
    } else {
      try {
        const updateObj = { cart };
        const response = await axios.put(`/api/users/cart/${id}`, updateObj);
        return { cart: response.data, error: null };
      } catch (error) {
        console.log(error);
      }
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    productsReset: {
      reducer(state) {
        state.products = {};
        state.count = 0;
        state.shipping = 0;
        state.itemTotal = 0;
        state.total = 0;
      },
    },
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
        state.itemTotal += parsedPrice * quantity;
        state.total =
          (state.itemTotal * (100 + state.taxPercent)) / 100 + state.shipping;
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
        state.itemTotal -= parsedPrice * removalQuantity;
        state.total =
          (state.itemTotal * (100 + state.taxPercent)) / 100 + state.shipping;
      },
    },
    productDeleted: {
      reducer(state, action) {
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
  extraReducers: {
    [fetchCart.fulfilled]: (state, action) => {
      const { cart, error } = action.payload;
      if (!error) {
        state.status = "idle";
        state.products = cart.products;
        state.count = cart.count;
        state.shipping = cart.shipping;
        state.itemTotal = cart.itemTotal;
        state.total =
          (state.itemTotal * (100 + state.taxPercent)) / 100 + state.shipping;
      } else {
        state.error = error;
      }
    },

    [fetchCart.rejected]: (state, action) => {
      state.error = "Something went wrong with our servers";
    },
  },
});

export const selectCartItemCount = (state) => state.cart.count;
export const selectCartContents = (state) => state.cart.products;
export const selectCartShippingCost = (state) => state.cart.shipping;
export const selectCartItemTotal = (state) => state.cart.itemTotal;
export const selectTaxPercent = (state) => state.cart.taxPercent;
export const {
  productsReset,
  productAdded,
  productRemoved,
  productDeleted,
} = cartSlice.actions;
export default cartSlice.reducer;

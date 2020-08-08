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
const joinCarts = (cart1, cart2, getState) => {
  let newCart = {
    count: cart2.count,
    itemTotal: cart2.itemTotal,
    products: cart2.products,
    shipping: cart2.shipping,
    taxPercent: getState().cart.taxPercent,
    total: cart2.total,
  };
  for (let [id, product] of Object.entries(cart1.products)) {
    let product1 = cart1.products[id];
    let product2 = cart2.products[id];
    let product1Price = parseInt(product1.price.slice(1, -1));
    if (
      cart2.products.hasOwnProperty(id) &&
      product2.itemsInCart < product1.itemsInCart
    ) {
      newCart.products[id] = product1;
      newCart.count += product1.itemsInCart - product2.itemsInCart;
      newCart.itemTotal +=
        (product1.itemsInCart - product2.itemsInCart) * product1Price;
    } else if (!cart2.products.hasOwnProperty(id)) {
      newCart.products[id] = product1;
      newCart.itemTotal += product1.itemsInCart * product1Price;
      newCart.count += product1.itemsInCart;
    }
  }
  return newCart;
};

export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (_, { getState }) => {
    const id = getState().auth.user._id;
    let cart = JSON.parse(localStorage.getItem("cart")) || initialState;
    if (id === null) {
      return { cart, error: null };
    } else {
      if (cart && cart.count) {
        try {
          const response = await axios.get(`/api/users/cart/${id}`);
          const joinedCart = joinCarts(cart, response.data, getState);
          const update = await axios.put(`/api/users/cart/${id}`, {
            cart: joinedCart,
          });
          localStorage.clear();
          return { cart: update.data, error: null };
        } catch (error) {
          console.log(error);
        }
      } else {
        try {
          const response = await axios.get(`/api/users/cart/${id}`);
          return { cart: response.data, error: null };
        } catch (error) {
          console.log(error);
        }
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
        const { _id, price, quantity } = action.payload;
        console.log(action.payload);
        const parsedPrice = parseFloat(price.slice(1, -1)).toFixed(2);
        if (!state.products[_id]) {
          let { quantity, ...rest } = action.payload;
          state.products[_id] = rest;
        }
        state.products[_id].itemsInCart += quantity;
        state.count += quantity;
        state.itemTotal += parsedPrice * quantity;
        state.total =
          (state.itemTotal * (100 + state.taxPercent)) / 100 + state.shipping;
      },
    },
    productRemoved: {
      reducer(state, action) {
        const { _id, price, quantity } = action.payload;
        const parsedPrice = parseFloat(price.slice(1, -1)).toFixed(2);
        const removalQuantity =
          state.products[_id].itemsInCart < quantity
            ? state.products[_id].itemsInCart
            : quantity;
        if (!state.products[_id]) {
          console.log("No product to remove");
        } else {
          state.products[_id].itemsInCart -= removalQuantity;
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
          state.count -= state.products[_id].itemsInCart;
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

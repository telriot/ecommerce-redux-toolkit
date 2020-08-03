import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { productsReset } from "../cart/cartSlice";
import axios from "axios";

const initialState = {
  activeStep: 0,
  clientSecret: "",
  transactionDetails: {},
  error: "",
  status: "idle",
};

export const createPaymentIntent = createAsyncThunk(
  "checkout/createPaymentIntent",
  async (_, { getState }) => {
    const intentObj = {
      products: getState().cart.products,
    };
    try {
      const response = await axios.post(`/api/stripe/create-intent`, intentObj);
      console.log(response);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
);
export const confirmCardPayment = createAsyncThunk(
  "checkout/confirmCardPayment",
  async (payload, { getState, dispatch }) => {
    const { payment_method, stripe } = payload;
    const clientSecret = getState().checkout.clientSecret;
    console.log("test");
    const products = getState().cart.products;
    const total = getState().cart.total;
    const itemTotal = getState().cart.itemTotal;
    const taxPercent = getState().cart.taxPercent;
    const shipping = getState().cart.shipping;
    const userId = getState().auth.user._id;
    const transactionDetails = {
      products,
      total,
    };
    try {
      await stripe.confirmCardPayment(clientSecret, {
        payment_method,
      });
      dispatch(checkoutSlice.actions.completedTransaction(transactionDetails));
      await axios.post("/api/orders/", {
        orderObj: {
          products,
          total,
          itemTotal,
          taxPercent,
          shipping,
        },
        userId,
      });
      dispatch(productsReset());
    } catch (error) {
      console.log(error);
      return { error };
    }
  }
);
const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    completedTransaction: {
      reducer(state, action) {
        state.transactionDetails = action.payload;
      },
    },
    movedToNextStep: {
      reducer(state) {
        state.activeStep++;
      },
    },
    movedToPrevStep: {
      reducer(state) {
        state.activeStep--;
      },
    },
  },
  extraReducers: {
    [createPaymentIntent.pending]: (state) => {
      state.status = "pending";
    },
    [createPaymentIntent.fulfilled]: (state, action) => {
      const { clientSecret } = action.payload;
      state.clientSecret = clientSecret;
      state.activeStep++;
      state.error = action.error;
      state.status = "fulfilled";
    },
    [createPaymentIntent.rejected]: (state) => {
      state.error = "Something went wrong with our servers";
      state.status = "rejected";
    },
    [confirmCardPayment.pending]: (state) => {
      state.status = "pending";
    },
    [confirmCardPayment.fulfilled]: (state, action) => {
      state.activeStep++;
      state.error = action.error;
      state.status = "fulfilled";
    },
    [confirmCardPayment.rejected]: (state) => {
      state.error = "Something went wrong with our servers";
      state.status = "rejected";
    },
  },
});

export const selectCheckoutError = (state) => state.checkout.error;
export const selectCheckoutStatus = (state) => state.checkout.status;
export const selectCheckoutTransactionDetails = (state) =>
  state.checkout.transactionDetails;
export const selectCheckoutClientSecret = (state) =>
  state.checkout.clientSecret;

export const { movedToNextStep, movedToPrevStep } = checkoutSlice.actions;
export default checkoutSlice.reducer;

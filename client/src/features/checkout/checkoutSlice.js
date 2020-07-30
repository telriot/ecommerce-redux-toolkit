import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { productsReset } from "../cart/cartSlice";
import axios from "axios";

const initialState = {
  activeStep: 0,
  clientSecret: "",
  completedTransaction: {},
  error: "",
  status: "idle",
};

export const createPaymentIntent = createAsyncThunk(
  "checkout/createPaymentIntent",
  async (_, { getState }) => {
    const intentObj = {
      amount: getState().cart.itemTotal * 100,
      currency: "usd",
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
    const transactionDetails = {
      products: getState().cart.products,
      total: getState().cart.total,
    };
    const response = await stripe.confirmCardPayment(clientSecret, {
      payment_method,
    });
    dispatch(checkoutSlice.actions.completedTransaction(transactionDetails));
    dispatch(productsReset());
    console.log(response);
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

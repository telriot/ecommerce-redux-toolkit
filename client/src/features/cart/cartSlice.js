import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = { products: [], status: "idle", prevState: {} };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: {},
});

export default cartSlice.reducer;

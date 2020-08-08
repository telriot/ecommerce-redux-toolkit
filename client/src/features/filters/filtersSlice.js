import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  textFilter: "",
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    textFilterSet: {
      reducer(state, action) {
        state.textFilter = action.payload;
      },
    },
  },
  extraReducers: {},
});

export const { textFilterSet } = filtersSlice.actions;
export const selectTextFilter = (state) => state.filters.textFilter;
export default filtersSlice.reducer;

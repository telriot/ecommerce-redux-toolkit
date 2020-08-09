import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  textFilter: "",
  brands: [],
  brandFilter: [],
  minPriceFilter: "",
  maxPriceFilter: "",
};
export const fetchBrandsList = createAsyncThunk(
  "filters/fetchBrandsList",
  async () => {
    try {
      const response = await axios.get("/api/brands/list");
      return { success: true, brandsList: response.data };
    } catch (error) {
      console.log(error);
      return { success: false, error };
    }
  }
);
const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    textFilterSet: {
      reducer(state, action) {
        state.textFilter = action.payload;
      },
    },
    minPriceFilterSet: {
      reducer(state, action) {
        state.minPriceFilter = action.payload;
      },
    },
    maxPriceFilterSet: {
      reducer(state, action) {
        state.maxPriceFilter = action.payload;
      },
    },
    brandFilterSet: {
      reducer(state, action) {
        if (state.brandFilter.includes(action.payload)) {
          state.brandFilter = state.brandFilter.filter(
            (item) => item !== action.payload
          );
        } else {
          state.brandFilter.push(action.payload);
        }
      },
    },
    filtersReset: {
      reducer(state) {
        state = initialState;
      },
    },
  },
  extraReducers: {
    [fetchBrandsList.pending]: (state, action) => {
      state.status = "pending";
    },
    [fetchBrandsList.fulfilled]: (state, action) => {
      const { brandsList, error, success } = action.payload;

      if (success) {
        state.brands = brandsList;
      } else {
        state.brands = [];
        state.error = error;
      }

      state.status = "fulfilled";
    },
    [fetchBrandsList.rejected]: (state, action) => {
      state.error = "Something went wrong with our servers";
      state.status = "rejected";
    },
  },
});

export const {
  textFilterSet,
  minPriceFilterSet,
  maxPriceFilterSet,
  brandFilterSet,
  filtersReset,
} = filtersSlice.actions;
export const selectTextFilter = (state) => state.filters.textFilter;
export default filtersSlice.reducer;

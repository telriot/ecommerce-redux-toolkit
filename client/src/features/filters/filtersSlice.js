import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  textFilter: "",
  brands: [],
  brandFilter: [],
  minPriceFilter: "",
  maxPriceFilter: "",
  departments: [],
  departmentFilter: "",
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
export const fetchDepartmentsList = createAsyncThunk(
  "filters/fetchDepartmentsList",
  async () => {
    try {
      const response = await axios.get("/api/departments/list");
      return { success: true, departmentsList: response.data };
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
    departmentFilterSet: {
      reducer(state, action) {
        state.departmentFilter = action.payload;
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
    brandFilterImperativelySet: {
      reducer(state, action) {
        state.brandFilter = [];
        state.brandFilter.push(action.payload);
      },
    },
    filtersReset: {
      reducer(state) {
        state.brandFilter = [];
        state.minPriceFilter = "";
        state.maxPriceFilter = "";
        state.departmentFilter = "";
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
    [fetchDepartmentsList.pending]: (state, action) => {
      state.status = "pending";
    },
    [fetchDepartmentsList.fulfilled]: (state, action) => {
      const { departmentsList, error, success } = action.payload;

      if (success) {
        state.departments = departmentsList;
      } else {
        state.departments = [];
        state.error = error;
      }

      state.status = "fulfilled";
    },
    [fetchDepartmentsList.rejected]: (state, action) => {
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
  brandFilterImperativelySet,
  departmentFilterSet,
  filtersReset,
} = filtersSlice.actions;
export const selectTextFilter = (state) => state.filters.textFilter;
export default filtersSlice.reducer;

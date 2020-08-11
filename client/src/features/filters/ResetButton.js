import React from "react";
import { useDispatch } from "react-redux";
import { filtersReset } from "./filtersSlice";
import { Button } from "@material-ui/core";
import { fetchAllProducts } from "../products/productsSlice";

function DepartmentFilter() {
  const dispatch = useDispatch();
  const handleReset = () => {
    dispatch(filtersReset());
    dispatch(fetchAllProducts());
  };
  return (
    <Button onClick={handleReset} size="small">
      Reset filters
    </Button>
  );
}

export default DepartmentFilter;

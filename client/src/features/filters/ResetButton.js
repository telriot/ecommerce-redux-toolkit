import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { filtersReset } from "./filtersSlice";
import { Button } from "@material-ui/core";
import { fetchAllProducts } from "../products/productsSlice";

const useStyles = makeStyles((theme) => ({}));
function DepartmentFilter() {
  const classes = useStyles();

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

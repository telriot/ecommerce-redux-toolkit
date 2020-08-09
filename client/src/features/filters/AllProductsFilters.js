import React from "react";
import { makeStyles } from "@material-ui/styles";
import MinMaxFilter from "./MinMaxFilter";
import BrandsFilter from "./BrandsFilter";
const useStyles = makeStyles((theme) => ({
  grid: {
    margin: "2rem 0",
  },
}));
function AllProductsFilters() {
  const classes = useStyles();

  return (
    <div>
      <MinMaxFilter />
      <BrandsFilter />
    </div>
  );
}

export default AllProductsFilters;

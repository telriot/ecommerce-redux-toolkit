import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Divider } from "@material-ui/core";
import MinMaxFilter from "./MinMaxFilter";
import BrandsFilter from "./BrandsFilter";
import DepartmentFilter from "./DepartmentFilter";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    height: "100%",
    justifyContent: "space-around",
  },
}));
function AllProductsFilters() {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div>
        <DepartmentFilter />
        <BrandsFilter />
        <MinMaxFilter />
      </div>
      <Divider orientation="vertical" flexItem />
    </div>
  );
}

export default AllProductsFilters;

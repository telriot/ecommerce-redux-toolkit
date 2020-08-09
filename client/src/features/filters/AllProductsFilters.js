import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Divider } from "@material-ui/core";
import MinMaxFilter from "./MinMaxFilter";
import BrandsFilter from "./BrandsFilter";
import DepartmentFilter from "./DepartmentFilter";
import ResetButton from "./ResetButton";
const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    height: "100%",
    justifyContent: "space-around",
  },
  filtersDiv: {
    paddingTop: theme.spacing(4),
  },
}));
function AllProductsFilters() {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div className={classes.filtersDiv}>
        <DepartmentFilter />
        <BrandsFilter />
        <MinMaxFilter />
        <ResetButton />
      </div>
      <Divider orientation="vertical" flexItem />
    </div>
  );
}

export default AllProductsFilters;

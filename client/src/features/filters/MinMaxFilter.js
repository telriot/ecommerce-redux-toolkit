import React from "react";
import { useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { minPriceFilterSet, maxPriceFilterSet } from "./filtersSlice";
import { IconButton } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { fetchAllProducts } from "../products/productsSlice";

const useStyles = makeStyles((theme) => ({
  filterContainer: {},
  filterLabel: { marginBottom: theme.spacing(1) },
  inputDiv: {
    display: "flex",
    alignItems: "center",
    marginRight: theme.spacing(1),
  },
  filterInput: {
    width: "4rem",
  },
  separator: {
    padding: theme.spacing(1),
  },
}));

function MinMaxFilter() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleMinFilterChange = (e) => {
    dispatch(minPriceFilterSet(e.target.value));
  };
  const handleMaxFilterChange = (e) => {
    dispatch(maxPriceFilterSet(e.target.value));
  };
  const handleApplyFilter = () => {
    dispatch(fetchAllProducts());
  };

  return (
    <div className={classes.filterContainer}>
      <Typography className={classes.filterLabel} variant="body2">
        Price range
      </Typography>
      <div className={classes.inputDiv}>
        <TextField
          className={classes.filterInput}
          label="Min"
          id="min-filter"
          variant="outlined"
          size="small"
          type="number"
          onChange={handleMinFilterChange}
        />
        <Typography className={classes.separator}>~</Typography>
        <TextField
          className={classes.filterInput}
          label="Max"
          id="max-filter"
          variant="outlined"
          size="small"
          type="number"
          onChange={handleMaxFilterChange}
        />
        <IconButton onClick={handleApplyFilter}>
          <SearchIcon />
        </IconButton>
      </div>
    </div>
  );
}

export default MinMaxFilter;

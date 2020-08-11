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
  title: { marginBottom: theme.spacing(1) },

  inputDiv: {
    display: "flex",
    alignItems: "center",
    margin: theme.spacing(0, 0, 2, 1),
  },
  filterRoot: {
    width: "5rem",
    padding: theme.spacing(0),
  },
  filterInput: {
    padding: theme.spacing(1, 1),
    fontSize: theme.typography.caption.fontSize,
  },
  filterTextLabel: {
    fontSize: theme.typography.caption.fontSize,
    transform: "translate(14px, 10px) scale(1) !important",
  },

  filterTextLabelShrink: {
    fontSize: theme.typography.caption.fontSize,
    transform: "translate(14px, -10px) scale(.85) !important",
  },
  iconButton: {
    padding: theme.spacing(0.75),
    marginLeft: theme.spacing(1),
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
      <Typography className={classes.title} variant="body1">
        Price range
      </Typography>
      <div className={classes.inputDiv}>
        <TextField
          classes={{ root: classes.filterRoot }}
          inputProps={{
            className: classes.filterInput,
          }}
          InputLabelProps={{
            classes: {
              root: classes.filterTextLabel,
              shrink: classes.filterTextLabelShrink,
            },
          }}
          label="Min"
          id="min-filter"
          variant="outlined"
          size="small"
          type="number"
          onChange={handleMinFilterChange}
        />
        <Typography className={classes.separator}>~</Typography>
        <TextField
          classes={{ root: classes.filterRoot }}
          inputProps={{
            className: classes.filterInput,
          }}
          InputLabelProps={{
            classes: {
              root: classes.filterTextLabel,
              shrink: classes.filterTextLabelShrink,
            },
          }}
          label="Max"
          id="max-filter"
          variant="outlined"
          size="small"
          type="number"
          onChange={handleMaxFilterChange}
        />
        <IconButton
          classes={{ root: classes.iconButton }}
          onClick={handleApplyFilter}
        >
          <SearchIcon />
        </IconButton>
      </div>
    </div>
  );
}

export default MinMaxFilter;

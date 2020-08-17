import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import {
  sortOrderSet,
  selectSortOrder,
  fetchAllProducts,
} from "./productsSlice";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(2, 0),
    width: "10rem",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  selectInput: {
    padding: theme.spacing(1, 1),
    fontSize: theme.typography.caption.fontSize,
  },
  selectTextLabel: {
    fontSize: theme.typography.caption.fontSize,
    transform: "translate(14px, 11px) scale(1) !important",
  },

  selectTextLabelShrink: {
    fontSize: theme.typography.caption.fontSize,
    transform: "translate(14px, -10px) scale(.85) !important",
  },
}));
const options = [
  { value: "price", text: "Price: Low to High" },
  { value: "-price", text: "Price:High to Low" },
  { value: "brand", text: "Brand:A to Z" },
  { value: "-brand", text: "Brand:Z to A" },
];
function SortSelect() {
  const dispatch = useDispatch();
  const sortOrder = useSelector(selectSortOrder);
  const classes = useStyles();

  const handleChange = (event) => {
    dispatch(sortOrderSet(event.target.value));
    dispatch(fetchAllProducts());
  };
  return (
    <FormControl variant="outlined" className={classes.formControl}>
      <InputLabel
        classes={{
          root: classes.selectTextLabel,
          shrink: classes.selectTextLabelShrink,
        }}
        id="sort-select"
      >
        Sort by
      </InputLabel>
      <Select
        labelId="sort-selector"
        id="sort-selector"
        value={sortOrder}
        onChange={handleChange}
        label="Sort by"
        inputProps={{
          className: classes.selectInput,
          "data-testid": "sort-selector",
        }}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {options.map((option, index) => (
          <MenuItem value={option.value} key={`sort-option-${index}`}>
            {option.text}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default SortSelect;

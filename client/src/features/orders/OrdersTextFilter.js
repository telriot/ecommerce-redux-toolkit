import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import { ordersTextFilterSet } from "./ordersSlice";

const useStyles = makeStyles((theme) => ({
  inputForm: { margin: theme.spacing(2, 1) },
}));

export default function ComposedTextField() {
  const dispatch = useDispatch();
  const textSearchInput = useSelector((state) => state.orders.ordersTextFilter);
  const classes = useStyles();

  const handleChange = (event) => {
    dispatch(ordersTextFilterSet(event.target.value));
  };

  return (
    <FormControl className={classes.inputForm} variant="outlined">
      <InputLabel htmlFor="component-outlined">Product</InputLabel>
      <OutlinedInput
        data-testid="text-filter-input"
        id="component-outlined"
        onChange={handleChange}
        label="Name"
        value={textSearchInput}
      />
    </FormControl>
  );
}

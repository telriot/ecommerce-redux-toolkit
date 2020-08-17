import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles((theme) => ({
  formControl: { margin: theme.spacing(2, 1) },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

function OrdersSelect({ options, label, value, onChange, testid }) {
  const classes = useStyles();

  return (
    <FormControl variant="outlined" className={classes.formControl}>
      <InputLabel id="demo-simple-select-outlined-label">{label}</InputLabel>
      <Select
        native
        labelId={`order-select-${label}-outlined`}
        id={`order-select-${label}`}
        value={value}
        onChange={onChange}
        label={label}
        inputProps={{ "data-testid": testid }}
      >
        {options.map((option, index) =>
          index === 0 ? (
            <option key={`option-${option.value}`} value={option.value}>
              {option.display}
            </option>
          ) : (
            <option key={`option-${option.value}`} value={option.value}>
              {option.display}
            </option>
          )
        )}
      </Select>
    </FormControl>
  );
}

export default OrdersSelect;

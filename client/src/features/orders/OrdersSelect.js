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

function OrdersYearSelect({ options, label }) {
  const classes = useStyles();
  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  return (
    <FormControl variant="outlined" className={classes.formControl}>
      <InputLabel id="demo-simple-select-outlined-label">{label}</InputLabel>
      <Select
        labelId={`order-select-${label}-outlined`}
        id={`order-select-${label}`}
        value={age}
        onChange={handleChange}
        label={label}
      >
        {options.map((option, index) =>
          index === 0 ? (
            <MenuItem value={option.value}>
              <em>{option.display}</em>
            </MenuItem>
          ) : (
            <MenuItem value={option.value}>{option.display}</MenuItem>
          )
        )}
      </Select>
    </FormControl>
  );
}

export default OrdersYearSelect;

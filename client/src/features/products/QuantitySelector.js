import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));
function QuantitySelector({ availability, desiredAmount, setDesiredAmount }) {
  const classes = useStyles();
  const renderOptions = (availability) => {
    const options = [];
    for (let i = 1; i <= availability; i++) {
      options.push(<MenuItem value={i}>{i.toString()}</MenuItem>);
    }
    return options;
  };
  const handleSelectChange = (e) => {
    setDesiredAmount(e.target.value);
  };
  return (
    <FormControl variant="outlined" className={classes.formControl}>
      <InputLabel id="quantity-select-label">Quantity</InputLabel>
      <Select
        labelId="quantity-select-label"
        value={desiredAmount}
        onChange={handleSelectChange}
        label="Quantity"
        inputProps={{
          name: "quantity",
          id: "quantity-selector",
        }}
      >
        {renderOptions(availability)}
      </Select>
    </FormControl>
  );
}

export default QuantitySelector;

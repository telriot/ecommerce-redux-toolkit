import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
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
      options.push(<option value={i}>{i}</option>);
    }
    return options;
  };
  const handleSelectChange = (e) => {
    setDesiredAmount(e.target.value);
  };
  return (
    <FormControl variant="outlined" className={classes.formControl}>
      <InputLabel htmlFor="outlined-age-native-simple">Quantity</InputLabel>
      <Select
        native
        value={desiredAmount}
        onChange={handleSelectChange}
        label="Quantity"
        inputProps={{
          name: "quantity",
          id: "quantity-selector",
        }}
      >
        <option aria-label="None" value="" />
        {renderOptions(availability)}
      </Select>
    </FormControl>
  );
}

export default QuantitySelector;

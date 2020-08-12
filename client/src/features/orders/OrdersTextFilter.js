import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import OutlinedInput from "@material-ui/core/OutlinedInput";

const useStyles = makeStyles((theme) => ({
  inputForm: { margin: theme.spacing(2, 1) },
}));

export default function ComposedTextField() {
  const [name, setName] = React.useState("Composed TextField");
  const classes = useStyles();

  const handleChange = (event) => {
    setName(event.target.value);
  };

  return (
    <FormControl className={classes.inputForm} variant="outlined">
      <InputLabel htmlFor="component-outlined">Product</InputLabel>
      <OutlinedInput
        id="component-outlined"
        onChange={handleChange}
        label="Name"
      />
    </FormControl>
  );
}

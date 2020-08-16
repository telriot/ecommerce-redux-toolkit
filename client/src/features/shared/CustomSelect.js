import React from "react";
import { Field } from "formik";
import { Select } from "formik-material-ui";
import { makeStyles } from "@material-ui/core/styles";
import { MenuItem, FormControl, InputLabel } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  disabled: {
    color: theme.palette.text.primary,
  },
  formControl: { width: "100%" },
  field: { margin: theme.spacing(1, 0, 1, 0) },
  root: { margin: theme.spacing(0.625, 0, 1, 0), flex: 1 },
  menu: { maxHeight: "18rem" },
  inputRoot: { padding: 0 },
}));
function CustomSelect({ label, name, options, type, disabled }) {
  const classes = useStyles();

  return (
    <FormControl className={classes.formControl}>
      <InputLabel id="country-label" htmlFor={name}>
        Country{" "}
      </InputLabel>

      <Field
        inputProps={{
          classes: {
            disabled: classes.disabled,
            root: classes.inputRoot,
          },
          "data-testid": `testid-${name}`,
        }}
        MenuProps={{
          classes: {
            paper: classes.menu,
          },
          variant: "menu",
          transitionDuration: 0,
        }}
        classes={{ root: classes.root }}
        className={classes.field}
        disabled={disabled}
        component={Select}
        type={type}
        label={label}
        name={name}
        aria-labelledby="country-label"
      >
        {options.map((option, index) => (
          <MenuItem
            key={`option-${name}-${index}`}
            value={option.Code}
            disabled={!index}
          >
            {option.Name}
          </MenuItem>
        ))}
      </Field>
    </FormControl>
  );
}

export default CustomSelect;

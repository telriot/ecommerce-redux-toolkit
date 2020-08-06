import React from "react";
import { Field } from "formik";
import { TextField } from "formik-material-ui";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  disabled: {
    color: theme.palette.text.primary,
  },
  root: {
    marginBottom: theme.spacing(1),
  },
}));
function CustomTextField({ disabled, label, name, type }) {
  const classes = useStyles();

  return (
    <Field
      InputProps={{
        classes: {
          disabled: classes.disabled,
        },
        "data-testid": `testid-${name}`,
      }}
      InputLabelProps={{
        classes: {
          disabled: classes.disabled,
        },
      }}
      classes={{ root: classes.root }}
      disabled={disabled}
      component={TextField}
      type={type || "text"}
      label={label}
      name={name}
    />
  );
}

export default CustomTextField;

import React from "react";
import { Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import NewAddressForm from "./NewAddressForm";
import Switch from "@material-ui/core/Switch";
import Collapse from "@material-ui/core/Collapse";

const useStyles = makeStyles((theme) => ({
  grid: {},
  header: { display: "flex", justifyContent: "space-between" },
  paper: { padding: theme.spacing(3) },
}));
function NewAddressCard() {
  const classes = useStyles();
  const [checked, setChecked] = React.useState(false);
  const handleChange = () => {
    setChecked((prev) => !prev);
  };
  return (
    <Paper className={classes.paper}>
      <div className={classes.header}>
        <Typography variant="h6">Add a shipping address</Typography>

        <Switch checked={checked} onChange={handleChange} />
      </div>
      <Collapse in={checked}>
        <NewAddressForm />
      </Collapse>
    </Paper>
  );
}

export default NewAddressCard;

import React from "react";
import { Grid, Paper, Typography, Button, IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
const useStyles = makeStyles((theme) => ({
  item: { display: "flex" },
  details: { flex: 1 },
}));
function OrderItem({ order, index }) {
  const classes = useStyles();
  const date = new Date(order.date);
  const parsedDate = date.toLocaleString().split(",")[0];
  return (
    <>
      {index !== 0 ? <Divider variant="middle" /> : null}
      <div className={classes.item}>
        <div className={classes.details}>
          <Typography>{parsedDate}</Typography>
          <Typography>{order.total}$</Typography>
        </div>
        <IconButton>
          <ExpandMoreIcon />
        </IconButton>
      </div>
    </>
  );
}

export default OrderItem;

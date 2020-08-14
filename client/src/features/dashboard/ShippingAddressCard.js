import React from "react";
import { useDispatch } from "react-redux";
import { Typography, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CallIcon from "@material-ui/icons/Call";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import { removeAddress } from "./dashboardSlice";
const useStyles = makeStyles((theme) => ({
  card: { padding: theme.spacing(2, 0) },
  iconDiv: { display: "flex", alignItems: "center" },
  icon: {
    fontSize: theme.typography.body2.fontSize,
    marginRight: theme.spacing(1),
  },
}));
function ShippingAddressCard({ address, index }) {
  const {
    firstName,
    lastName,
    email,
    phone,
    street,
    country,
    state,
    postcode,
    city,
  } = address;
  const dispatch = useDispatch();
  const classes = useStyles();
  const handleDeleteClick = () => {
    dispatch(removeAddress(index));
  };

  return (
    <div className={classes.card}>
      <Typography>{`${firstName} ${lastName}`}</Typography>
      <Typography variant="body2">{street}</Typography>
      <Typography variant="body2">{`${postcode} ${city}`}</Typography>
      <Typography variant="body2">{`${state} ${country}`}</Typography>
      <div className={classes.iconDiv}>
        <CallIcon className={classes.icon} />
        <Typography variant="body2">{phone}</Typography>
      </div>
      <div className={classes.iconDiv}>
        <MailOutlineIcon className={classes.icon} />
        <Typography variant="body2">{email}</Typography>
      </div>
      <Button color="secondary" size="small" onClick={handleDeleteClick}>
        Delete
      </Button>
    </div>
  );
}

export default ShippingAddressCard;

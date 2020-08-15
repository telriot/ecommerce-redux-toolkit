import React from "react";
import { useDispatch } from "react-redux";
import { Typography, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CallIcon from "@material-ui/icons/Call";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import { removeAddress } from "./dashboardSlice";
const useStyles = makeStyles((theme) => ({
  card: { padding: theme.spacing(2, 0) },
  text: { whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" },
  iconDiv: { display: "flex", alignItems: "center" },
  icon: {
    fontSize: theme.typography.body2.fontSize,
    marginRight: theme.spacing(1),
  },
}));
function ShippingAddressCard({ address, index, selector, handleSelect }) {
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
      <Typography
        className={classes.text}
      >{`${firstName} ${lastName}`}</Typography>
      <Typography className={classes.text} variant="body2">
        {street}
      </Typography>
      <Typography
        className={classes.text}
        variant="body2"
      >{`${postcode} ${city}`}</Typography>
      <Typography
        className={classes.text}
        variant="body2"
      >{`${state} ${country}`}</Typography>
      <div className={classes.iconDiv}>
        <CallIcon className={classes.icon} />
        <Typography className={classes.text} variant="body2">
          {phone}
        </Typography>
      </div>
      <div className={classes.iconDiv}>
        <MailOutlineIcon className={classes.icon} />
        <Typography className={classes.text} variant="body2">
          {email}
        </Typography>
      </div>
      {selector ? (
        <Button color="primary" size="small" onClick={handleSelect}>
          Send to this address
        </Button>
      ) : (
        <Button color="secondary" size="small" onClick={handleDeleteClick}>
          Delete
        </Button>
      )}
    </div>
  );
}

export default ShippingAddressCard;

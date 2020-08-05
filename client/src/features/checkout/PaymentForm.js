import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  confirmCardPayment,
  movedToPrevStep,
  selectCheckoutStatus,
} from "./checkoutSlice";
import { Button, Grid, TextField, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import StripeInput from "./stripe/StripeInput";

const useStyles = makeStyles((theme) => ({
  grid: {},
}));

export default function PaymentForm() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const elements = useElements();
  const stripe = useStripe();
  const [cardOwnerName, setCardOwnerName] = React.useState("");
  const isValidating = useSelector(selectCheckoutStatus);
  const handleCardOwnerNameChange = (e) => {
    setCardOwnerName(e.target.value);
  };
  const handleBack = () => {
    dispatch(movedToPrevStep());
  };
  const handleNext = () => {
    const payload = {
      stripe,
      payment_method: {
        card: elements.getElement(CardNumberElement),
        billing_details: {
          name: cardOwnerName,
        },
      },
    };
    dispatch(confirmCardPayment(payload));
  };

  const isDisabled = Boolean(isValidating === "pending");
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Payment method
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cardName"
            label="Name on card"
            fullWidth
            autoComplete="cc-name"
            value={cardOwnerName}
            onChange={handleCardOwnerNameChange}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cardNumber"
            label="Card number"
            fullWidth
            autoComplete="cc-number"
            InputLabelProps={{ shrink: true }}
            InputProps={{
              inputComponent: StripeInput,
              inputProps: {
                component: CardNumberElement,
              },
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="expDate"
            label="Expiry date"
            fullWidth
            autoComplete="cc-exp"
            InputLabelProps={{ shrink: true }}
            InputProps={{
              inputComponent: StripeInput,
              inputProps: {
                component: CardExpiryElement,
              },
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cvc"
            label="CVC"
            helperText="Last three digits on signature strip"
            fullWidth
            autoComplete="cc-csc"
            InputLabelProps={{ shrink: true }}
            InputProps={{
              inputComponent: StripeInput,
              inputProps: {
                component: CardCvcElement,
                placeholder: "",
              },
            }}
          />
        </Grid>
      </Grid>
      <div className={classes.buttons}>
        <Button onClick={handleBack} className={classes.button}>
          Back
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleNext}
          className={classes.button}
          disabled={isDisabled}
        >
          Pay
        </Button>
      </div>
    </React.Fragment>
  );
}

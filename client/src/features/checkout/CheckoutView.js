import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectAuthorizedUser } from "../auth/authSlice";
import { fetchUser } from "../dashboard/dashboardSlice";
import {
  createPaymentIntent,
  selectCheckoutError,
  selectCheckoutStatus,
  movedToPrevStep,
} from "./checkoutSlice";
import {
  Container,
  Paper,
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AddressForm from "./AddressForm";
import PaymentForm from "./PaymentForm";
import Review from "./Review";

const useStyles = makeStyles((theme) => ({
  grid: {},
  paper: { padding: theme.spacing(3) },
  stepper: {},
}));

const steps = ["Billing Info", "Payment details", "Order Confirmation"];
function getStepContent(step) {
  switch (step) {
    case 0:
      return <AddressForm />;
    case 1:
      return <PaymentForm />;
    case 2:
      return <Review />;
    default:
      throw new Error("Unknown step");
  }
}

function CheckoutView() {
  const dispatch = useDispatch();
  const history = useHistory();
  const isProcessing = useSelector(selectCheckoutStatus);
  const error = useSelector(selectCheckoutError);
  const authUser = useSelector(selectAuthorizedUser);
  const classes = useStyles();
  const activeStep = useSelector((state) => state.checkout.activeStep);

  const handleNext = () => {
    if (activeStep === 0) {
      dispatch(createPaymentIntent());
    } else if (activeStep === 2) {
      history.push("/");
    }
  };

  const handleBack = () => {
    dispatch(movedToPrevStep());
  };

  React.useEffect(() => {
    authUser && dispatch(fetchUser());
  }, [dispatch, authUser]);

  return (
    <Container>
      <Paper className={classes.paper}>
        <Typography variant="h4" align="center">
          Checkout
        </Typography>
        <Stepper activeStep={activeStep} className={classes.stepper}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <React.Fragment>
          {activeStep === steps.length ? (
            <React.Fragment>
              <Typography variant="h5" gutterBottom>
                Thank you for your order.
              </Typography>
              <Typography variant="subtitle1">
                Your order number is #2001539. We have emailed your order
                confirmation, and will send you an update when your order has
                shipped.
              </Typography>
            </React.Fragment>
          ) : (
            <React.Fragment>
              {getStepContent(activeStep)}
              <div className={classes.buttons}>
                {activeStep !== 0 && activeStep !== 1 && (
                  <Button onClick={handleBack} className={classes.button}>
                    Back
                  </Button>
                )}
                {activeStep !== 1 && (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    className={classes.button}
                  >
                    {activeStep === steps.length - 1 ? "Main page" : "Next"}
                  </Button>
                )}
              </div>
            </React.Fragment>
          )}
        </React.Fragment>
      </Paper>
    </Container>
  );
}

export default CheckoutView;

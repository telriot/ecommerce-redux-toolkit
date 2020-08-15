import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectAuthorizedUser } from "../auth/authSlice";
import { fetchUser } from "../dashboard/dashboardSlice";
import { createPaymentIntent } from "./checkoutSlice";
import {
  Container,
  Paper,
  Stepper,
  Step,
  StepLabel,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AddressForm from "./AddressForm";
import PaymentForm from "./PaymentForm";
import Review from "./Review";
import AlternativeAddressSelector from "./AlternativeAddressSelector";

const useStyles = makeStyles((theme) => ({
  container: { margin: theme.spacing(6, "auto") },
  paper: { padding: theme.spacing(3) },
  stepper: {},
}));

const steps = ["Billing Info", "Payment details", "Order Confirmation"];
function getStepContent(step, handleNext, handleBack) {
  switch (step) {
    case 0:
      return <AddressForm handleNext={handleNext} />;
    case 1:
      return <PaymentForm />;
    case 2:
      return <Review handleBack={handleBack} handleNext={handleNext} />;
    default:
      throw new Error("Unknown step");
  }
}

function CheckoutView() {
  const dispatch = useDispatch();
  const history = useHistory();
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

  React.useEffect(() => {
    authUser && dispatch(fetchUser());
  }, [dispatch, authUser]);

  return (
    <Container className={classes.container}>
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
          <React.Fragment>
            {getStepContent(activeStep, handleNext)}
          </React.Fragment>
        </React.Fragment>
      </Paper>
      {activeStep === 0 && <AlternativeAddressSelector />}
    </Container>
  );
}

export default CheckoutView;

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectBillingInfo,
  selectDashboardStatus,
} from "../dashboard/dashboardSlice";
import { Typography, Grid, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Formik, Form } from "formik";
import { profileSchema } from "../../validators";
import UserInfoForm from "../shared/UserInfoForm";
import { selectCartItemCount } from "../cart/cartSlice";
import { activeShippingAddressSet } from "./checkoutSlice";
const useStyles = makeStyles((theme) => ({
  form: {
    display: "flex",
    flexDirection: "column",
    marginBottom: theme.spacing(3),
    width: "100%",
  },
  btnDiv: {
    marginTop: theme.spacing(2),
  },
}));
export default function AddressForm({ handleNext }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const billingInfo = useSelector(selectBillingInfo);
  const itemCount = useSelector(selectCartItemCount);

  const formikRef = React.useRef();
  const {
    firstName,
    lastName,
    email,
    phone,
    street,
    country,
    city,
    state,
    postcode,
  } = billingInfo;
  const dashboardStatus = useSelector(selectDashboardStatus);
  const shippingAddress = useSelector(
    (state) => state.checkout.activeShippingAddress
  );

  React.useEffect(() => {
    shippingAddress.firstName
      ? formikRef.current.setValues({ ...shippingAddress })
      : dispatch(activeShippingAddressSet({ ...billingInfo }));
  }, [shippingAddress, billingInfo, dispatch]);
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Shipping address
      </Typography>
      <Grid container>
        {dashboardStatus === "fulfilled" ? (
          <Formik
            innerRef={formikRef}
            initialValues={{
              firstName: firstName || "",
              lastName: lastName || "",
              email: email || "",
              street: street || "",
              city: city || "",
              country: country || "",
              state: state || "",
              postcode: postcode || "",
              phone: phone || "",
            }}
            validationSchema={profileSchema}
            onSubmit={(values, { setSubmitting }) => {
              handleNext();
              setSubmitting(false);
            }}
          >
            {({ submitForm }) => (
              <Form className={classes.form}>
                <UserInfoForm />
                <div className={classes.btnDiv}>
                  <Button
                    variant="contained"
                    color="primary"
                    disabled={Boolean(itemCount === 0)}
                    onClick={submitForm}
                    className={classes.button}
                  >
                    Next
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        ) : (
          "Loading"
        )}
      </Grid>
    </>
  );
}

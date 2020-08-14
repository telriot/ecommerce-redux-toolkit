import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Card, Typography } from "@material-ui/core";
import AvailabilityInfo from "../shared/AvailabilityInfo";
import AddToCartButton from "../shared/AddToCartButton";
import QuantitySelector from "./QuantitySelector";
const useStyles = makeStyles((theme) => ({
  rightSideCard: {
    padding: theme.spacing(2),
  },
  grid: {},
}));
function ProductDetail({ product }) {
  const classes = useStyles();
  const { price, availability } = product;
  const [desiredAmount, setDesiredAmount] = React.useState(1);

  return (
    <Card className={classes.rightSideCard}>
      <Typography variant="h6">${price}</Typography>
      <AvailabilityInfo format="detail" availability={availability} />{" "}
      <QuantitySelector
        availability={availability}
        desiredAmount={desiredAmount}
        setDesiredAmount={setDesiredAmount}
      />
      <AddToCartButton
        product={product}
        quantity={desiredAmount}
        format="button"
      />
    </Card>
  );
}

export default ProductDetail;

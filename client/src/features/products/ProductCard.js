import React from "react";
import { Card, Typography, CardMedia } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector } from "react-redux";
import { selectAuthorizedUser } from "../auth/authSlice";
import WishlistButton from "./WishlistButton";
import AvailabilityInfo from "../shared/AvailabilityInfo";
import AddToCartButton from "../shared/AddToCartButton";
import DescriptionText from "../shared/DescriptionText";

const useStyles = makeStyles((theme) => ({
  card: {
    padding: theme.spacing(1),
    margin: theme.spacing(2),
    height: "24rem",
  },
  media: {
    height: 150,
    width: "100%",
    marginBottom: theme.spacing(1),
  },
  nameDiv: { marginBottom: theme.spacing(2) },
  bottomDiv: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  priceDiv: {
    display: "flex",
    flexDirection: "column",
  },
}));

function ProductCard({ product }) {
  const { name, brand, description, availability, price } = product;
  const classes = useStyles();
  const user = useSelector(selectAuthorizedUser);

  return (
    <Card className={classes.card}>
      <CardMedia className={classes.media} image={product.image} />
      <div className={classes.nameDiv}>
        <Typography className={classes.productName} variant="h6">
          {name}
        </Typography>
        <Typography className={classes.productBrand} variant="caption">
          {brand}
        </Typography>
      </div>

      <DescriptionText description={description} maxLength={80} />
      <br />
      <div className={classes.bottomDiv}>
        <div className={classes.priceDiv}>
          <Typography variant="body1">${price}</Typography>
          <AvailabilityInfo availability={availability} />
        </div>

        <div className={classes.buttonDiv}>
          <AddToCartButton product={product} />
          {user._id !== null && <WishlistButton product={product} />}
        </div>
      </div>
    </Card>
  );
}

export default ProductCard;

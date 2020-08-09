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
    height: "100%",
  },
  media: {
    height: 200,
    width: "100%",
    marginBottom: theme.spacing(1),
  },
  nameDiv: { marginBottom: theme.spacing(2) },
  productName: { lineHeight: "1.6rem" },
  bottomDiv: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  price: {
    display: "flex",
  },
  priceUnit: {
    transform: "translateY(5px)",
  },
  priceTag: {
    fontWeight: 400,
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

      <DescriptionText description={description} maxLength={60} />
      <br />
      <div className={classes.bottomDiv}>
        <div className={classes.priceDiv}>
          <div className={classes.price}>
            <Typography className={classes.priceUnit} variant="caption">
              $
            </Typography>
            <Typography className={classes.priceTag} variant="h6" component="p">
              {price}
            </Typography>
          </div>

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

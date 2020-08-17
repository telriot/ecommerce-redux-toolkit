import React from "react";
import { Card, Typography, CardMedia } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector } from "react-redux";
import { selectAuthorizedUser } from "../auth/authSlice";
import WishlistButton from "./WishlistButton";
import AvailabilityInfo from "../shared/AvailabilityInfo";
import AddToCartButton from "../shared/AddToCartButton";
import DescriptionText from "../shared/DescriptionText";
import { useHistory } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  card: {
    height: "100%",
  },
  media: {
    height: 200,
    width: "100%",
    marginBottom: theme.spacing(1),
    cursor: "pointer",
  },
  infoDiv: { padding: theme.spacing(1) },
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
  const history = useHistory();
  const { name, brand, description, availability, price, _id } = product;
  const classes = useStyles();
  const user = useSelector(selectAuthorizedUser);
  const handleProductRedirect = () => {
    history.push(`/products/${_id}`);
  };
  return (
    <Card data-testid="product-card" className={classes.card}>
      {product.image && (
        <CardMedia
          onClick={handleProductRedirect}
          className={classes.media}
          image={product.image}
        />
      )}
      <div className={classes.infoDiv}>
        <div className={classes.nameDiv}>
          <Typography
            data-testid="product-name"
            className={classes.productName}
            variant="h6"
          >
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
              <Typography
                className={classes.priceTag}
                variant="h6"
                component="p"
              >
                {price}
              </Typography>
            </div>

            <AvailabilityInfo availability={availability} format="card" />
          </div>

          <div className={classes.buttonDiv}>
            <AddToCartButton product={product} format="icon" />
            {user._id !== null && <WishlistButton product={product} />}
          </div>
        </div>
      </div>
    </Card>
  );
}

export default ProductCard;

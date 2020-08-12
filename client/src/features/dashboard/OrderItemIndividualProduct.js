import React from "react";
import {
  Card,
  CardMedia,
  Typography,
  IconButton,
  Divider,
  Button,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Link } from "react-router-dom";
import MuiLink from "@material-ui/core/Link";
import BrandLink from "../products/BrandLink";
import AddToCartButton from "../shared/AddToCartButton";
const useStyles = makeStyles((theme) => ({
  productCard: {
    display: "flex",
    justifyContent: "space-between",
    padding: theme.spacing(2),
  },
  media: {
    width: 100,
    height: 100,
  },
  mainDiv: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    padding: theme.spacing(0, 2),
    flex: 1,
  },
  mainTextDiv: {
    display: "flex",
    flexDirection: "column",
  },
  brandLink: {
    marginBottom: theme.spacing(2),
  },
  rightButtonsDiv: {
    display: "flex",
    flexDirection: "column",
  },
}));
function OrderItemIndividualProduct({ product, index }) {
  const classes = useStyles();
  const { _id, image, name, brand, price } = product;

  return (
    <>
      {index !== 0 && <Divider />}
      <div className={classes.productCard}>
        <Link to={`/api/products/${_id}`}>
          <img className={classes.media} alt={`product-${_id}`} src={image} />
        </Link>
        <div className={classes.mainDiv}>
          <div className={classes.mainTextDiv}>
            <Link to={`/api/products/${_id}`}>
              <MuiLink variant="body2">{name}</MuiLink>
            </Link>
            <BrandLink brand={brand} />
          </div>
          <Typography variant="body1">${price}</Typography>
        </div>
        <div className={classes.rightButtonsDiv}>
          <Button size="small">Buy again</Button>
          <Button size="small">Problem with order</Button>
          <Button size="small">Leave a review</Button>
        </div>
      </div>
    </>
  );
}

export default OrderItemIndividualProduct;

import React from "react";
import { useHistory } from "react-router-dom";
import { Typography, Divider, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import MuiLink from "@material-ui/core/Link";
import BrandLink from "../products/BrandLink";

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
  productLink: {
    cursor: "pointer",
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
  const history = useHistory();

  const { _id, image, name, brand, price, itemsInCart } = product;
  const handleProductRedirect = () => {
    history.push(`/products/${_id}`);
  };
  return (
    <>
      {index !== 0 && <Divider />}
      <div className={classes.productCard}>
        <img
          onClick={handleProductRedirect}
          className={classes.media}
          alt={`product-${_id}`}
          src={image}
        />

        <div className={classes.mainDiv}>
          <div className={classes.mainTextDiv}>
            <MuiLink
              className={classes.productLink}
              onClick={handleProductRedirect}
              variant="body2"
            >
              {name}
            </MuiLink>

            <BrandLink brand={brand} />
          </div>

          <Typography variant="body2">
            {" "}
            {itemsInCart > 1 ? `${itemsInCart} @ $${price} each` : `$${price}`}
          </Typography>
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

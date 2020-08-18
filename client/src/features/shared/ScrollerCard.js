import React from "react";
import { Link, useHistory } from "react-router-dom";

import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AddToCartButton from "./AddToCartButton";
import MuiLink from "@material-ui/core/Link";

const useStyles = makeStyles((theme) => ({
  verticalDiv: {
    display: "flex",
    padding: theme.spacing(1, 0),
  },
  productImage: {
    width: "100%",
  },
  productImageVertical: {
    width: "6rem",
  },
  productInfoVertical: {},
  rightSideDivVertical: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    padding: theme.spacing(0, 2),
  },
}));
function ScrollerCard({ product, variant }) {
  const classes = useStyles();
  const history = useHistory();
  const { name, price, _id, image } = product;
  const handleProductLink = (_id) => () => {
    history.push(`/products/${_id}`);
  };
  const renderScrollerCardVariant = (variant) => {
    switch (variant) {
      case "vertical":
        return (
          <div data-testid="scroller-card" className={classes.verticalDiv}>
            <Link to={`/products/${_id}`}>
              <img
                className={classes.productImageVertical}
                src={image}
                alt={name}
              />
            </Link>
            <div className={classes.rightSideDivVertical}>
              <div className={classes.productInfoVertical}>
                <MuiLink onClick={handleProductLink(_id)} variant="caption">
                  {name}
                </MuiLink>
                <Typography variant="body1">${price}</Typography>
              </div>
              <AddToCartButton
                product={product}
                format="button"
                quantity={1}
                size="small"
              />
            </div>
          </div>
        );
      default:
        return (
          <div data-testid="scroller-card">
            <Link to={`/products/${_id}`}>
              <img className={classes.productImage} src={image} alt={name} />
            </Link>
            <MuiLink variant="caption">
              <Link to={`/products/${_id}`}>{name}</Link>
            </MuiLink>
            <Typography variant="body1">${price}</Typography>
          </div>
        );
    }
  };
  return renderScrollerCardVariant(variant);
}

export default ScrollerCard;

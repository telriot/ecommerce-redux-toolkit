import React from "react";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import WishlistButton from "../products/WishlistButton";
const useStyles = makeStyles((theme) => ({
  item: {
    display: "flex",
    padding: theme.spacing(2),
  },
  details: { flex: 1 },
  iconButton: {
    alignSelf: "flex-start",
  },

  icon: {
    transform: "rotate(0deg)",
    transition: "transform",
    transitionDuration: theme.transitions.duration.short,
  },
  iconRotated: {
    transform: "rotate(180deg)",
    transition: "transform",
    transitionDuration: theme.transitions.duration.short,
  },
}));
function WishlistItem({ product, index }) {
  const classes = useStyles();

  return (
    <>
      {index !== 0 ? <Divider variant="middle" /> : null}
      <div data-testid="wishlist-item" className={classes.item}>
        <div className={classes.details}>
          <Typography>{product.name}</Typography>
        </div>

        <WishlistButton product={product} />
      </div>
    </>
  );
}

export default WishlistItem;

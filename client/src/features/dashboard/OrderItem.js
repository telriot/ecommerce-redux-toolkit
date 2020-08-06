import React from "react";
import { Typography, IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
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
function OrderItem({ order, index }) {
  const [isOpen, setIsOpen] = React.useState(false);
  const classes = useStyles();
  const date = new Date(order.date);
  const parsedDate = date.toLocaleString().split(",")[0];
  const parsedProducts = Object.values(order.products).map(
    (product, index) => product
  );
  const handleOpenClick = () => {
    setIsOpen((prevState) => !prevState);
  };
  return (
    <>
      {index !== 0 ? <Divider variant="middle" /> : null}
      <div data-testid="order-item" className={classes.item}>
        <div className={classes.details}>
          <Typography>{parsedDate}</Typography>

          <div>
            {isOpen ? (
              parsedProducts.map((product, index) => (
                <Typography key={`typo-${index}`}>
                  {product.quantity} x {product.name}@ {product.price}$
                </Typography>
              ))
            ) : (
              <>
                <Typography>
                  {parsedProducts[0].quantity} x {parsedProducts[0].name} @{" "}
                  {parsedProducts[0].price}$
                </Typography>
                {parsedProducts.length > 1 ? (
                  <Typography>...</Typography>
                ) : null}
              </>
            )}
          </div>
          <Typography>Total: {order.total}$</Typography>
        </div>
        <IconButton
          data-testid="order-expand-button"
          className={classes.iconButton}
          onClick={handleOpenClick}
        >
          <ExpandMoreIcon
            className={isOpen ? classes.iconRotated : classes.icon}
          />
        </IconButton>
      </div>
    </>
  );
}

export default OrderItem;

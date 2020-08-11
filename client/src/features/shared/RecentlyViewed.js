import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Card, Grid, Typography, Link, IconButton } from "@material-ui/core";
import ScrollerCard from "../shared/ScrollerCard";
const useStyles = makeStyles((theme) => ({
  card: {
    display: "flex",
    flexDirection: "column",
    padding: theme.spacing(2),
  },
}));
const products = [
  {
    name: "testProduct1",
    date: "2020-01-26T04:17:06.415Z",

    price: 100,
    description: "test product 1",
    availability: 2,
    brand: "test brand 1",
    weight: 10,
    image: "https://picsum.photos/200/200",
    _id: "testid1",
  },
  {
    name: "testProduct2",
    date: "2020-02-26T04:17:06.415Z",
    price: 200,
    description: "test product 2",
    availability: 2,
    brand: "test brand 2",
    weight: 20,
    image: "https://picsum.photos/200/200",

    _id: "testid2",
  },
  {
    name: "testProduct3",
    date: "2020-03-26T04:17:06.415Z",
    price: 300,
    description: "test product 3",
    availability: 3,
    brand: "test brand 3",
    weight: 30,
    image: "https://picsum.photos/200/200",

    _id: "testid3",
  },
];
function RecentlyViewed() {
  const classes = useStyles();

  return (
    <>
      <Card className={classes.card}>
        {" "}
        <Typography className={classes.title}>Recently viewed items</Typography>
        {products.map((product, index) => (
          <ScrollerCard
            key={`scroller-${index}`}
            product={product}
            variant="vertical"
          />
        ))}
      </Card>
    </>
  );
}

export default RecentlyViewed;

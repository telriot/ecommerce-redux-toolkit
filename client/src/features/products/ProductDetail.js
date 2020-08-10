import React from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Divider, Grid, Typography } from "@material-ui/core";
import { fetchProduct } from "./productsSlice";
import ProductDetailActionCard from "./ProductDetailActionCard";
const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    padding: theme.spacing(1, 4, 4, 4),
  },
  returnLink: {
    fontSize: theme.typography.caption.fontSize,
    padding: theme.spacing(1, 0),
    marginBottom: theme.spacing(2),
  },
  mainPic: {
    width: "100%",
  },
  productDescription: {
    padding: theme.spacing(0, 2),
  },
  grid: {},
}));
function ProductDetail() {
  const classes = useStyles();
  const params = useParams();
  const dispatch = useDispatch();
  const selectedProduct = useSelector(
    (state) => state.products.selectedProduct
  );
  const {
    description,
    name,
    price,
    image,
    brand,
    availability,
  } = selectedProduct;
  const [desiredAmount, setDesiredAmount] = React.useState("");

  React.useEffect(() => {
    dispatch(fetchProduct(params.id));
  }, []);
  return (
    <Container className={classes.container}>
      <Link className={classes.returnLink}>Back to results</Link>
      <Grid container>
        <Grid item container xs={10}>
          <Grid item container>
            <Grid item xs={7}>
              <img className={classes.mainPic} src={image} />
            </Grid>
            <Grid className={classes.productDescription} item xs={5}>
              <Typography variant="h5">{name}</Typography>
              <Typography variant="caption">{brand}</Typography>
              <Typography variant="body1">{description}</Typography>
            </Grid>
          </Grid>
          <Divider flexItem />
          <div>Similar items</div>
        </Grid>
        <Grid item xs={2}>
          <ProductDetailActionCard product={selectedProduct} />
        </Grid>
      </Grid>
    </Container>
  );
}

export default ProductDetail;

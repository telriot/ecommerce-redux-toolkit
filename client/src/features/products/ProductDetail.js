import React from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Divider, Grid, Typography } from "@material-ui/core";
import { fetchProduct, fetchFromTheSameCategory } from "./productsSlice";
import {
  recentViewAdded,
  updateRecentViews,
} from "../recentViews/recentViewsSlice";
import ProductDetailActionCard from "./ProductDetailActionCard";
import PictureSelector from "./PictureSelector";
import ProductHorizontalScroller from "./ProductHorizontalScroller";
//import BackLink from "./BackLink";
import BrandLink from "./BrandLink";
const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    padding: theme.spacing(4, 4, 4, 4),
  },
  mainContentGrid: {
    marginBottom: theme.spacing(3),
  },
  pictureDiv: {
    display: "flex",
  },
  mainPic: {
    width: "100%",
    paddingLeft: theme.spacing(1),
  },
  productHeader: {
    marginBottom: theme.spacing(1),
  },
  divider: {
    marginBottom: theme.spacing(1),
  },
  productDescription: {
    padding: theme.spacing(0, 2),
  },
}));
const thumbs = [
  "http://lorempixel.com/64/64/animals",
  "http://lorempixel.com/64/64/abstract",
  "http://lorempixel.com/64/64/cats",
  "http://lorempixel.com/64/64/business",
];
const pics = [
  "http://lorempixel.com/500/500/animals",
  "http://lorempixel.com/500/500/abstract",
  "http://lorempixel.com/500/500/cats",
  "http://lorempixel.com/500/500/business",
];
function ProductDetail() {
  const classes = useStyles();
  const params = useParams();
  const dispatch = useDispatch();
  const scrollerProducts = useSelector(
    (state) => state.products.fromTheSameCategory
  );
  const selectedProduct = useSelector(
    (state) => state.products.selectedProduct
  );
  const { description, name, brand, department } = selectedProduct;
  const [displayedPicture, setDisplayedPicture] = React.useState(0);

  React.useEffect(() => {
    dispatch(fetchProduct(params.id));
  }, [dispatch, params.id]);
  React.useEffect(() => {
    department && dispatch(fetchFromTheSameCategory(department));
  }, [dispatch, department]);
  React.useEffect(() => {
    if (selectedProduct) {
      dispatch(recentViewAdded(selectedProduct));
      dispatch(updateRecentViews());
    }
  }, [dispatch, selectedProduct]);
  return (
    <Container className={classes.container}>
      {/*<BackLink />*/}

      <Grid className={classes.mainContentGrid} container>
        <Grid item container xs={10}>
          <Grid item container>
            <Grid item xs={7}>
              <div className={classes.pictureDiv}>
                <PictureSelector
                  setPicture={setDisplayedPicture}
                  thumbs={thumbs}
                />
                <img
                  className={classes.mainPic}
                  alt="product"
                  src={pics[displayedPicture]}
                />
              </div>
            </Grid>
            <Grid className={classes.productDescription} item xs={5}>
              <div className={classes.productHeader}>
                <Typography variant="h5">{name}</Typography>
                <BrandLink brand={brand} />
              </div>
              <Divider className={classes.divider} />
              <Typography variant="body2">{description}</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={2}>
          <ProductDetailActionCard product={selectedProduct} />
        </Grid>
      </Grid>
      <Divider />
      <ProductHorizontalScroller products={scrollerProducts} />
    </Container>
  );
}

export default ProductDetail;

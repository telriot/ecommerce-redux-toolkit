import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { Grid, Typography, Link, Divider, IconButton } from "@material-ui/core";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import ScrollerCard from "../shared/ScrollerCard";

const useStyles = makeStyles((theme) => ({
  headerDiv: {
    display: "flex",
    flex: 1,
    justifyContent: "space-between",
    alignItems: "flex-end",
    padding: theme.spacing(2, 0),
  },
  headerNavigation: {
    display: "flex",
  },
  headerDivider: {
    margin: theme.spacing(0, 1),
  },
  startOverLink: {
    cursor: "pointer",
  },
  arrowIconButton: { margin: theme.spacing(0, 1) },
  scrollerDiv: { display: "flex", alignItems: "center" },

  scrollingProductsDiv: {
    flex: 1,
  },
}));
function ProductHorizontalScroller({ products }) {
  const classes = useStyles();
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up("md"));
  const isLg = useMediaQuery(theme.breakpoints.up("lg"));
  const [productsPerPage, setProductsPerPage] = React.useState(0);
  const [page, setPage] = React.useState(1);
  const [scrollerCardsToRender, setScrollerCardsToRender] = React.useState([]);
  const [totalPages, setTotalPages] = React.useState(1);
  React.useEffect(() => {
    isLg
      ? setProductsPerPage(6)
      : isMd
      ? setProductsPerPage(4)
      : setProductsPerPage(1);
  }, [isMd, isLg]);

  React.useEffect(() => {
    const paginateScrollerCards = (products) =>
      products
        .filter(
          (order, index) =>
            index < page * productsPerPage &&
            index >= page * productsPerPage - productsPerPage
        )
        .map((product, index) => (
          <Grid item md={12 / productsPerPage} lg={12 / productsPerPage}>
            <ScrollerCard key={`scroller-${index}`} product={product} />
          </Grid>
        ));
    setScrollerCardsToRender(paginateScrollerCards(products));
    setTotalPages(Math.ceil(products.length / productsPerPage));
  }, [products, page, productsPerPage, totalPages]);
  const handleBackClick = () => {
    setPage((prevState) => prevState - 1);
  };
  const handleForwardClick = () => {
    setPage((prevState) => prevState + 1);
  };
  const handleStartOver = () => {
    setPage(1);
  };

  return (
    <>
      <div className={classes.headerDiv}>
        <Typography variant="h6">From the same category</Typography>
        <div className={classes.headerNavigation}>
          <Typography variant="caption">
            Page {page} of {totalPages}
          </Typography>
          <Divider
            className={classes.headerDivider}
            flexItem
            variant="vertical"
          />
          <Link
            className={classes.startOverLink}
            variant="caption"
            onClick={handleStartOver}
          >
            Start over
          </Link>
        </div>
      </div>
      <div className={classes.scrollerDiv}>
        <IconButton
          className={classes.arrowIconButton}
          onClick={handleBackClick}
          disabled={Boolean(page <= 1)}
        >
          <ArrowBackIosIcon />
        </IconButton>
        <div className={classes.scrollingProductsDiv}>
          <Grid container spacing={1}>
            {scrollerCardsToRender}
          </Grid>
        </div>
        <IconButton
          className={classes.arrowIconButton}
          onClick={handleForwardClick}
          disabled={Boolean(page >= totalPages)}
        >
          <ArrowForwardIosIcon />
        </IconButton>
      </div>
    </>
  );
}

export default ProductHorizontalScroller;

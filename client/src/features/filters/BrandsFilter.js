import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/styles";
import { fetchBrandsList } from "./filtersSlice";
import { Container, Link, Typography } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  brandLink: {
    cursor: "pointer",
  },
  brandsDiv: {
    display: "flex",
    flexDirection: "column",
  },
}));
function BrandsFilter() {
  const classes = useStyles();
  const brands = useSelector((state) => state.filters.brands);
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(fetchBrandsList());
  }, []);

  const Brand = ({ brandName }) => (
    <Link underline="none">
      <Typography variant="caption" className={classes.brandLink}>
        {brandName}
      </Typography>
    </Link>
  );
  return (
    <div>
      <Typography variant="body2">Brands</Typography>
      <div className={classes.brandsDiv}>
        {brands
          .filter((brand, index) => index < 15)
          .map((brand, index) => {
            console.log(brand.name);
            return <Brand key={`brand-${index}`} brandName={brand.name} />;
          })}
      </div>
    </div>
  );
}

export default BrandsFilter;

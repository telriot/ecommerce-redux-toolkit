import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { fetchBrandsList, brandFilterSet } from "./filtersSlice";
import {
  Container,
  Link,
  FormControlLabel,
  Checkbox,
  Typography,
} from "@material-ui/core";
import { fetchAllProducts } from "../products/productsSlice";

const useStyles = makeStyles((theme) => ({
  brandLink: {
    cursor: "pointer",
  },
  brandsDiv: {
    display: "flex",
    flexDirection: "column",
  },
  checkbox: {
    padding: theme.spacing(0.25, 0.5),
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  label: { fontSize: theme.typography.caption.fontSize },
}));
function BrandsFilter() {
  const classes = useStyles();
  const brands = useSelector((state) => state.filters.brands);
  const brandFilter = useSelector((state) => state.filters.brandFilter);
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(fetchBrandsList());
  }, []);

  const Brand = ({ brandName }) => {
    const handleCheckBoxChange = (e) => {
      dispatch(brandFilterSet(brandName));
      dispatch(fetchAllProducts());
    };
    const isChecked = brandFilter.includes(brandName);

    return (
      <FormControlLabel
        control={
          <Checkbox
            checked={isChecked}
            onChange={handleCheckBoxChange}
            name={brandName}
            color="primary"
            disableRipple
            size="small"
            classes={{ root: classes.checkbox }}
          />
        }
        label={brandName}
        classes={{ label: classes.label }}
      />
    );
  };

  {
    /*}
    <Link underline="none" onClick={handleBrandClick}>
      <Typography variant="caption" className={classes.brandLink}>
        {brandName}
      </Typography>
  </Link>*/
  }

  return (
    <div>
      <Typography variant="body2">Brands</Typography>
      <div className={classes.brandsDiv}>
        {brands
          .filter((brand, index) => index < 15)
          .map((brand, index) => (
            <Brand key={`brand-${index}`} brandName={brand.name} />
          ))}
      </div>
    </div>
  );
}

export default BrandsFilter;

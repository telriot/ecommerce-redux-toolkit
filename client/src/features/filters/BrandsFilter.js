import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { fetchBrandsList, brandFilterSet } from "./filtersSlice";
import { FormControlLabel, Checkbox, Typography } from "@material-ui/core";
import { fetchAllProducts } from "../products/productsSlice";
import { pageChanged } from "../products/productsSlice";

const useStyles = makeStyles((theme) => ({
  title: { marginBottom: theme.spacing(1) },

  brandLink: {
    cursor: "pointer",
    marginBottom: theme.spacing(0.25),
  },
  brandsDiv: {
    display: "flex",
    flexDirection: "column",
    margin: theme.spacing(0, 0, 2, 1.75),
  },
  checkbox: {
    padding: theme.spacing(0.25, 0.5),
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  label: {
    fontSize: theme.typography.caption.fontSize,
  },
}));
function BrandsFilter() {
  const classes = useStyles();
  const brands = useSelector((state) => state.filters.brands);
  const brandFilter = useSelector((state) => state.filters.brandFilter);
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(fetchBrandsList());
  }, [dispatch]);

  const Brand = ({ brandName }) => {
    const handleCheckBoxChange = (e) => {
      dispatch(brandFilterSet(brandName));
      dispatch(fetchAllProducts());
      dispatch(pageChanged(1));
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
        classes={{ root: classes.brandLink, label: classes.label }}
      />
    );
  };

  return (
    <>
      <Typography className={classes.title} variant="body1">
        Brands
      </Typography>
      <div className={classes.brandsDiv}>
        {brands
          .filter((brand, index) => index < 15)
          .map((brand, index) => (
            <Brand key={`brand-${index}`} brandName={brand.name} />
          ))}
      </div>
    </>
  );
}

export default BrandsFilter;

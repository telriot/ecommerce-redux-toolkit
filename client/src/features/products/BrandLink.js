import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import MuiLink from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import { brandFilterImperativelySet } from "../filters/filtersSlice";
function BrandLink({ brand }) {
  const dispatch = useDispatch();
  const handleBrandLink = () => {
    dispatch(brandFilterImperativelySet(brand));
  };

  return (
    <Typography variant="caption">
      by{" "}
      <MuiLink>
        <Link onClick={handleBrandLink} to="/">
          {brand}
        </Link>
      </MuiLink>
    </Typography>
  );
}

export default BrandLink;
